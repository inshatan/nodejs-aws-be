import * as utils from '../utils/db';
import { getProductById } from './getProductById';

const headers = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Credentials': true,
};

describe('getProductById handler', () => {
  const validProductId = '7567ec4b-b10c-48c5-9345-fc73c48a80aa';
  const event = { pathParameters: { productId: validProductId } };
  utils.createClient = jest.fn().mockReturnValue({
    connect() {},
    end() {},
  });

  test('should return 400 if no productId provided', async () => {
    const response = await getProductById({});
    expect(response.statusCode).toBe(400);
  });

  test('product data should be returned with status code 200', () => {
    const data = {
      description: 'Book Description1',
      id: validProductId,
      price: 2.4,
      title: 'Book One',
    };
    utils.queryProduct = jest.fn().mockReturnValue(data);
    return expect(getProductById(event)).resolves.toEqual({
      statusCode: 200,
      headers,
      body: JSON.stringify(data),
    });
  });

  // test('should return 404 for not existing product', () => {
  //   const error = new Error('Mocked error');
  //   utils.queryProduct = jest.fn().mockImplementation(() => {
  //     throw error;
  //   });
  //   return expect(getProductById(event)).resolves.toEqual({
  //     statusCode: 404,
  //     headers,
  //     body: JSON.stringify({ error: error.message }),
  //   });
  // });
});
