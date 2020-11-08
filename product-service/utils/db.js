// FIXME require
const { Client } = require('pg');

const {
  PG_HOST, PG_PORT, PG_DATABASE, PG_USERNAME, PG_PASSWORD,
} = process.env;

export const createClient = () => new Client({
  host: PG_HOST,
  port: PG_PORT,
  database: PG_DATABASE,
  user: PG_USERNAME,
  password: PG_PASSWORD,
  ssl: {
    rejectUnauthorized: false, // to avoid warring in this example
  },
  connectionTimeoutMillis: 5000, // time in millisecond for termination of the database query
});

export const queryProduct = async (client, productId) => {
  const { rows } = await client.query({
    text: `
    SELECT products.*, stocks.count 
    FROM products
    LEFT JOIN stocks ON products.id = stocks.product_id
    WHERE products.id = $1
  `,
    values: [productId],
  });
  return rows.length ? rows[0] : null;
};

export const queryAllProducts = async (client) => {
  const { rows } = await client.query({
    text: `
      SELECT products.*, stocks.count 
      FROM products
      LEFT JOIN stocks ON products.id = stocks.product_id
    `,
  });
  return rows;
};

export const queryCreateProduct = async (client, data) => {
  const {
    title, description, price, count,
  } = data;
  try {
    await client.query('BEGIN');
    const { rows: productRows } = await client.query(`
      INSERT INTO products (title, description, price) 
      VALUES ($1, $2, $3)
      RETURNING id;
    `, [title, description, price]);
    const productId = productRows.length ? productRows[0].id : null;
    if (!productId) {
      throw new Error('Products insert operation unexpectedly fails');
    }
    const { rowCount: stocksRowCount } = await client.query(`
      INSERT INTO stocks (product_id, count) 
      VALUES ($1, $2)
    `, [productId, count]);
    if (stocksRowCount !== 1) {
      throw new Error('Stocks insert operation unexpectedly fails');
    }
    await client.query('COMMIT');
    return productId;
  } catch (error) {
    await client.query('ROLLBACK');
    throw error;
  }
};
