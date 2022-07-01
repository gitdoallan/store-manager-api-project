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

module.exports = {
  getAllProducts,
  findProductById,
};