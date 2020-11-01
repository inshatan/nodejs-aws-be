import { getProduct } from '../services/products';

export const getProductById = async (event) => {
  console.log('... getProductById');
  const { pathParameters } = event;
  const { productId } = pathParameters || {};

  if (!productId) {
    return {
      statusCode: 400,
      body: JSON.stringify({
        error: 'missing product id',
      }),
    };
  }

  try {
    const product = await getProduct(productId);
    return {
      statusCode: 200,
      body: JSON.stringify(product),
    };
  } catch (error) {
    return {
      statusCode: 404,
      body: JSON.stringify({
        error: error.message,
      }),
    };
  }
};
