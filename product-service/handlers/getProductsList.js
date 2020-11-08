import response from '../utils/response';
import { createClient, queryAllProducts } from '../utils/db';

export const getAllProducts = async (event) => {
  // logging incoming event
  console.log(event);

  let client = null;
  try {
    client = createClient();
    await client.connect();
    const listOfProducts = await queryAllProducts(client);
    return response(200, listOfProducts);
  } catch (error) {
    return response(500, { error: error.message });
  } finally {
    client && await client.end();
  }
};
