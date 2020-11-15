import { createClient, queryProduct, queryCreateProduct } from '../utils/db';
import response from '../utils/response';

const validateProductData = ({ title, price, count }) => {
  const errors = [];
  if (!title) {
    errors.push('Title is missing');
  }
  if (price === '' || isNaN(+price) || Number(price) < 0 || !Number.isInteger(+price)) {
    errors.push('Wrong or missing price');
  }
  if (count === '' || isNaN(+count) || Number(count) < 0 || !Number.isInteger(+count)) {
    errors.push('Wrong or missing stock count');
  }
  if (errors.length) {
    throw new Error(errors.join('; '));
  }
};

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
