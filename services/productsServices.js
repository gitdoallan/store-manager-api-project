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

const searchProduct = async (name) => {
  const products = await productsModel.searchProduct(name);
  if (!products) return [];
  return products;
};

const newProduct = async (name) => {
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

const updateProduct = async (id, name) => {
  const checkIfIdExists = await findProductById(id);
  if (!checkIfIdExists) {
    return {
      error: 'Product not found',
      code: httpStatus.NOT_FOUND,
    };
  }
  if (name.length < 5) {
    return {
      error: '"name" length must be at least 5 characters long',
      code: httpStatus.INVALID_ARGUMENT,
    };
  }
  await productsModel.updateProduct(id, name);
  return { id, name };
};

const deleteProduct = async (id) => {
  const checkIfIdExists = await findProductById(id);
  if (!checkIfIdExists) {
    return {
      error: 'Product not found',
      code: httpStatus.NOT_FOUND,
    };
  }
  const result = await productsModel.deleteProduct(id);
  return result;
};

module.exports = {
  getAllProducts,
  findProductById,
  newProduct,
  updateProduct,
  deleteProduct,
  searchProduct,
};
