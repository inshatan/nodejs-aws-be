import { getProduct } from '../services/products';

export const getProductById = async (event) => {
  console.log('... getProductById');
  const { pathParameters } = event;
  const { productId } = pathParameters || {};
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Credentials': true,
  };

  if (!productId) {
    return {
      statusCode: 400,
      headers,
      body: JSON.stringify({
        error: 'missing product id',
      }),
    };
  }

  try {
    const product = await getProduct(productId);
    return {
      statusCode: 200,
      headers,
      body: JSON.stringify(product),
    };
  } catch (error) {
    return {
      statusCode: 404,
      headers,
      body: JSON.stringify({
        error: error.message,
      }),
    };
  }
};
