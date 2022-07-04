const connection = require('../helpers/connection');

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

const getAllSales = async () => {
  const [sales] = await connection.query(`
    SELECT S.id AS saleId, S.date, P.product_id AS productId, P.quantity
    FROM StoreManager.sales S
    INNER JOIN StoreManager.sales_products P ON S.id = P.sale_id
    `);
  if (!sales) return null;
  return sales;
};

const findSalesById = async (id) => {
  const [[sale]] = await connection.query(`
    SELECT * FROM StoreManager.sales
    WHERE id = ?
  `, [id]);
  if (!sale) return null;
  const [products] = await connection.query(`
    SELECT S.date, P.product_id AS productId, P.quantity
    FROM StoreManager.sales AS S
    INNER JOIN StoreManager.sales_products AS P
    ON S.id = P.sale_id
    WHERE P.sale_id = ?
  `, [id]);
  return products;
};

const getLastSaleId = async () => {
  const [[{ id }]] = await connection.query('SELECT MAX(id) AS id FROM sales');
  if (!id) return 1;
  return id;
};

const updateSalesById = async (id, productId, quantity) => {
  const [rows] = await connection
    .execute(`
      UPDATE StoreManager.sales_products
      SET quantity = ?
      WHERE sale_id = ? AND product_id = ?
    `, [quantity, id, productId]);
  return rows;
};

const deleteSalesById = async (id) => {
  const [rows] = await connection.query(`
    DELETE FROM StoreManager.sales
    WHERE id = ?
  `, [id]);
  return rows;
};

module.exports = {
  newSale,
  newProductSale,
  getAllSales,
  getLastSaleId,
  findSalesById,
  deleteSalesById,
  updateSalesById,
};