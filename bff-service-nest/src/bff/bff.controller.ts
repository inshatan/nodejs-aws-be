import { All, Controller, Req, Res } from '@nestjs/common';
import { BffService } from './bff.service';
import { Request, Response } from 'express';
import { SimpleCache } from '../simple-cache/simple-cache';

@Controller('')
export class BffController {
  private cache: SimpleCache;
  private cacheUrlRegEx = /^\/products\/products\/?$/;
  constructor(private readonly srv: BffService) {
    this.cache = new SimpleCache();
  }

  @All()
  async process(@Req() req: Request, @Res() res: Response): Promise<any> {
    const { originalUrl, method, body } = req;
    const recipient = this.srv.findRecipient(originalUrl, method, body);
    if (!recipient) {
      res.status(502).json({
        error: 'Cannot process request',
      });
    }
    try {
      const useCache = this.cacheUrlRegEx.test(originalUrl);
      if (useCache && !this.cache.expired) {
        console.log('... CACHED DATA');
        return res.json(this.cache.data);
      }
      const data = await this.srv.makeRequest(recipient);
      if (useCache) {
        console.log('... CACHING');
        this.cache.data = data;
      }
      return res.json(data);
    } catch (error) {
      if (error.response) {
        const { status, data } = error.response;
        res.status(status).json(data);
      } else {
        res.status(500).json({ error: error.message });
      }
    }
  }
}
