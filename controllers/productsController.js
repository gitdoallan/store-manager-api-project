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

module.exports = {
  getAllProducts,
  findProductById,
};