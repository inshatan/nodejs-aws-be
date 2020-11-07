import { listProducts } from '../services/products';

export const getAllProducts = async (event) => {
  const list = await listProducts();
  return {
    statusCode: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Credentials': true,
    },
    body: JSON.stringify(list, null, 2),
  };
};
