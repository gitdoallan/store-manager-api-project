const productsModel = require('../models/productsModel');
const httpStatus = require('../helpers/httpStatusCodes');

const getAllProducts = async () => {
  const products = await productsModel.getAllProducts();
  return products || null;
};

const findProductById = async (id) => {
  const product = await productsModel.findProductById(id);
  return product || null;
};

const searchProduct = async (name) => {
  const products = await productsModel.searchProduct(name);
  return products || [];
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

// TODO: Regras do emersu || tudo que chama o banco, pode manter aqui, o resto bota em middleware.

module.exports = {
  getAllProducts,
  findProductById,
  newProduct,
  updateProduct,
  deleteProduct,
  searchProduct,
};
