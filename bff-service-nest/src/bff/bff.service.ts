import { Injectable } from '@nestjs/common';
import axios, { Method } from 'axios';
import { RecipientEntity } from './entity/recipient.entity';

@Injectable()
export class BffService {
  findRecipient(
    originalUrl: string,
    method: string,
    body: any,
  ): RecipientEntity {
    const urlParts = originalUrl.split('/');
    const recipientUrl = process.env[urlParts[1]];
    if (!recipientUrl) {
      return undefined;
    }
    const recipient = new RecipientEntity();
    recipient.name = urlParts[1];
    recipient.requestUrl = `${recipientUrl}/${urlParts.slice(2).join('/')}`;
    recipient.requestMethod = method;
    if (Object.keys(body || {}).length > 0) {
      recipient.requestData = body;
    }
    return recipient;
  }

  async makeRequest(recipient: RecipientEntity): Promise<any> {
    const { data } = await axios({
      method: recipient.requestMethod as Method,
      url: recipient.requestUrl,
      data: recipient.requestData,
    });
    return data;
  }
}
