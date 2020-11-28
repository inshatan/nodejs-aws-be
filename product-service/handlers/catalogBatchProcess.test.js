import { handler } from './catalogBatchProcess';
import * as utils from '../utils/db';

utils.createClient = jest.fn().mockReturnValue({
  connect() {},
  end() {},
});

// I was not able to configure the aws-sdk-mock to work correctly with SNS
// This work around was used to make testing of notifications possible
global.publishCallback = (msg) => null;
jest.mock('aws-sdk', () => ({
  SNS: class SNS {
    constructor() {
      return {
        publish: (msg) => {
          global.publishCallback(msg);
          return { promise() {} };
        },
      };
    }
  },
}));

describe('catalogBatchProcess', () => {
  describe('invalid data', () => {
    it('should send notification for invalid product and do not insert data to DB', async () => {
      jest.clearAllMocks();
      const data = { title: 'invalid product' };
      utils.queryCreateProduct = jest.fn();
      const publishCallbackSpy = jest.spyOn(global, 'publishCallback');

      await handler({
        Records: [{ body: JSON.stringify(data) }],
      });

      expect(publishCallbackSpy).toHaveBeenCalledTimes(1);
      expect(utils.queryCreateProduct.mock.calls.length).toBe(0);
    });
  });

  describe('valid data', () => {
    it('should save product to DB and send notification for valid data', async () => {
      jest.clearAllMocks();
      const data = {
        title: 'valid product',
      };
      const productId = 100;
      utils.validateProductData = jest.fn();
      utils.queryCreateProduct = jest.fn().mockReturnValue(productId);
      utils.queryProduct = jest.fn().mockReturnValue({ id: productId });
      const publishCallbackSpy = jest.spyOn(global, 'publishCallback');

      await handler({
        Records: [{ body: JSON.stringify(data) }],
      });

      expect(utils.queryCreateProduct.mock.calls.length).toBe(1);
      expect(publishCallbackSpy).toHaveBeenCalledTimes(1);
      expect(publishCallbackSpy).toHaveBeenLastCalledWith(
        expect.objectContaining({
          MessageAttributes: expect.objectContaining({
            productId: expect.objectContaining({
              StringValue: productId,
            }),
          }),
        }),
      );
    });
  });
});
