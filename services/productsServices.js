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

const newProduct = async (name) => {
  if (!name) return { error: 'Nome do produto não informado' };
  const product = await productsModel.newProduct(name);
  if (!product) return { error: 'Não foi possível criar o produto' };
  return product;
};

module.exports = {
  getAllProducts,
  findProductById,
  newProduct,
};
