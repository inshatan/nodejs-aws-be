import { listProducts } from '../services/products';

export const getAllProducts = async (event) => {
  const list = await listProducts();
  return {
    statusCode: 200,
    body: JSON.stringify(list, null, 2),
  };
};
