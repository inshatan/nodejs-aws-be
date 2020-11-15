import { createClient, queryProduct } from '../utils/db';
import response from '../utils/response';

export const getProductById = async (event) => {
  // logging incoming event
  console.log(event);

  const { pathParameters } = event;
  const { productId } = pathParameters || {};

  if (!productId) {
    return response(400, { error: 'missing product id' });
  }
  if (!/^[0-9a-f]{8}-[0-9a-f]{4}-[0-5][0-9a-f]{3}-[089ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(productId)) {
    return response(400, { error: 'invalid product id' });
  }

  let client = null;
  try {
    client = createClient();
    await client.connect();
    const product = await queryProduct(client, productId);
    return product
      ? response(200, product)
      : response(404, { error: `Product with id ${productId} not found` });
  } catch (error) {
    return response(500, { error: error.message });
  } finally {
    client && await client.end();
  }
};
