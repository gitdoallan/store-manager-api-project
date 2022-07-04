const connection = require('../helpers/connection');

const getAllProducts = async () => {
  const [rows] = await connection
    .execute(`
      SELECT id, name
      FROM StoreManager.products
      ORDER BY id ASC
    `);
  return rows;
};

const findProductById = async (id) => {
  const [rows] = await connection
    .execute(`
      SELECT id, name
      FROM StoreManager.products
      WHERE id = ?
    `, [id]);
  return rows[0];
};

const newProduct = async (name) => {
  const [rows] = await connection
    .execute(`
      INSERT INTO StoreManager.products (name)
      VALUES (?)
    `, [name]);
  return rows;
};

const updateProduct = async (id, name) => {
  const [rows] = await connection
    .execute(`
      UPDATE StoreManager.products
      SET name = ?
      WHERE id = ?
    `, [name, id]);
  return rows;
};

module.exports = {
  getAllProducts,
  findProductById,
  newProduct,
  updateProduct,
};