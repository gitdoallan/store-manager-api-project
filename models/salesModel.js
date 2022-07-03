const connection = require('../helpers/connection');

const getAllSales = async () => {
  const sales = await connection.query('SELECT * FROM sales');
  if (!sales) return null;
  return sales;
};

const getLastSaleId = async () => {
  const [[{ id }]] = await connection.query('SELECT MAX(id) AS id FROM sales');
  if (!id) return 1;
  return id;
};

const newSale = async () => {
  const [rows] = await connection
    .execute(`
      INSERT INTO StoreManager.sales (date)
      VALUES (NOW())
    `);
  return rows;
};

const newProductSale = async (saleId, productId, quantity) => {
  const [rows] = await connection
    .execute(`
      INSERT INTO StoreManager.sales_products (sale_id, product_id, quantity)
      VALUES (?, ?, ?)
    `, [saleId, productId, quantity]);
  return rows;
};

module.exports = {
  newSale,
  newProductSale,
  getAllSales,
  getLastSaleId,
};