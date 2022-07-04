const httpStatus = require('../helpers/httpStatusCodes');
const productsServices = require('../services/productsServices');
const messages = require('../helpers/messages');

const getAllProducts = async (_req, res) => {
  try {
    const results = await productsServices.getAllProducts();

    if (!results) {
      return res.status(httpStatus.NOT_FOUND).json({
        message: 'No products found',
      });
    }
    return res.status(httpStatus.OK).json(results);
  } catch (error) {
    return res.status(httpStatus.INTERNAL_SERVER).json({
      message: messages.INTERNAL_SERVER_ERROR_MSG,
    });
  }
};

const findProductById = async (req, res) => {
  const { id } = req.params;
  try {
    const results = await productsServices.findProductById(id);
    if (!results) {
      return res.status(httpStatus.NOT_FOUND).json({
        message: 'Product not found',
      });
    }
    return res.status(httpStatus.OK).json(results);
  } catch (error) {
    return res.status(httpStatus.INTERNAL_SERVER).json({
      message: messages.INTERNAL_SERVER_ERROR_MSG,
    });
  }
};

const newProduct = async (req, res) => {
  const { name } = req.body;
  if (!name) {
    return res.status(httpStatus.BAD_REQUEST).json({
      message: '"name" is required',
    }); 
}
  try {
    const results = await productsServices.newProduct(name);
    if (results.error) {
      return res.status(results.code).json({ message: results.error });
    }
    return res.status(httpStatus.CREATED).json({ id: results.insertId, name });
  } catch (error) {
    return res.status(httpStatus.INTERNAL_SERVER).json({
      message: messages.INTERNAL_SERVER_ERROR_MSG,
    });
  }
};

const updateProduct = async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  if (!name) {
    return res.status(httpStatus.BAD_REQUEST).json({
      message: '"name" is required',
    });
  }
  try {
    const results = await productsServices.updateProduct(id, name);
    if (results.error) {
      return res.status(results.code).json({ message: results.error });
    }
    return res.status(httpStatus.OK).json({ id, name });
  } catch (error) {
    return res.status(httpStatus.INTERNAL_SERVER).json({
      message: messages.INTERNAL_SERVER_ERROR_MSG,
    });
  }
};

const deleteProduct = async (req, res) => {
  const { id } = req.params;
  try {
    const results = await productsServices.deleteProduct(id);
    if (results.error) {
      return res.status(results.code).json({ message: results.error });
    }
    return res.status(httpStatus.NO_CONTENT).send();
  } catch (error) {
    return res.status(httpStatus.INTERNAL_SERVER).json({
      message: messages.INTERNAL_SERVER_ERROR_MSG,
    });
  }
};

module.exports = {
  getAllProducts,
  findProductById,
  newProduct,
  updateProduct,
  deleteProduct,
};