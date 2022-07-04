const httpStatus = require('../helpers/httpStatusCodes');
const productsServices = require('../services/productsServices');

const getAllProducts = async (_req, res) => {
  try {
    const results = await productsServices.getAllProducts();

    if (!results) {
      return res.status(httpStatus.NOT_FOUND).json({
        message: 'Nenhum produto foi encontrado',
      });
    }
    return res.status(httpStatus.OK).json(results);
  } catch (error) {
    return res.status(httpStatus.INTERNAL_SERVER).json({
      message: 'Erro interno no servidor',
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
      message: 'Erro interno no servidor',
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
      message: 'Erro interno no servidor',
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
      message: 'Erro interno no servidor',
    });
  }
};

module.exports = {
  getAllProducts,
  findProductById,
  newProduct,
  updateProduct,
};