import products from '../data/products.json';

export const getProduct = async (id) => {
  const idx = parseInt(id, 10);
  if (idx && idx > 0 && idx <= products.length) {
    return products[idx - 1];
  }
  throw new Error(`Product with id '${id}' not found`);
};

export const listProducts = async () => products;
