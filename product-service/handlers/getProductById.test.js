import * as service from '../services/products';
import { getProductById } from './getProductById';

const headers = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Credentials': true,
};

describe('getProductById handler', () => {
  const event = { pathParameters: { productId: 1 } };

  test('should return 400 if no productId provided', async () => {
    const response = await getProductById({});
    expect(response.statusCode).toBe(400);
  });

  test('product data should be returned with status code 200', () => {
    const data = {
      description: 'Book Description1',
      id: '7567ec4b-b10c-48c5-9345-fc73c48a80aa',
      price: 2.4,
      title: 'Book One',
    };
    service.getProduct = jest.fn().mockReturnValue(data);
    return expect(getProductById(event)).resolves.toEqual({
      statusCode: 200,
      headers,
      body: JSON.stringify(data),
    });
  });

  test('should return 404 for not existing product', () => {
    const error = new Error('Mocked error');
    service.getProduct = jest.fn().mockImplementation(() => {
      throw error;
    });
    return expect(getProductById(event)).resolves.toEqual({
      statusCode: 404,
      headers,
      body: JSON.stringify({ error: error.message }),
    });
  });
});
