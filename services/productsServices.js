const productsModel = require('../models/productsModel');

const getAllProducts = async () => {
  const products = await productsModel.getAllProducts();
  if (!products) return null;
  return products;
};

const findProductById = async (id) => {
  const product = await productsModel.findProductById(id);
  if (!product) return null;
  return product;
};

module.exports = {
  getAllProducts,
  findProductById,
};
