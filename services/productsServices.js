const productsModel = require('../models/productsModel');
const httpStatus = require('../helpers/httpStatusCodes');

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
  if (!name) return { error: '"name" is required' };
  if (name.length < 5) {
  return {
    error: '"name" length must be at least 5 characters long',
    code: httpStatus.INVALID_ARGUMENT,
  }; 
} 
  const product = await productsModel.newProduct(name);
  if (!product) {
 return {
    error: 'Não foi possível criar o produto',
    code: httpStatus.BAD_REQUEST,
  }; 
}
  return product;
};

module.exports = {
  getAllProducts,
  findProductById,
  newProduct,
};
