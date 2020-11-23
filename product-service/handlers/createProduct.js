import {
  createClient, validateProductData, queryProduct, queryCreateProduct,
} from '../utils/db';
import response from '../utils/response';

export const createProduct = async (event) => {
  // logging incoming event
  console.log(event);

  let data = null;
  try {
    data = JSON.parse(event.body);
    validateProductData(data);
  } catch (error) {
    return response(400, error.message);
  }

  let client = null;
  try {
    client = createClient();
    await client.connect();
    const productId = await queryCreateProduct(client, data);
    const product = await queryProduct(client, productId);
    return product
      ? response(200, product)
      : response(500, { error: 'Strange error has been occurred' });
  } catch (error) {
    return response(500, { error: error.message });
  } finally {
    client && await client.end();
  }
};
