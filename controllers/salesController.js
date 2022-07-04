const httpStatus = require('../helpers/httpStatusCodes');
const salesServices = require('../services/salesServices');

const newSale = async (req, res) => {
  const newSaleArray = req.body;
  try {
    const results = await salesServices.newSale(newSaleArray);
    if (results.error) {
      return res.status(results.code).json({ message: results.error });
    }
    return res.status(httpStatus.CREATED).json(results);
  } catch (error) {
    return res.status(httpStatus.INTERNAL_SERVER).json({
      message: 'Erro interno no servidor',
    });
  }
};

const getAllSales = async (_req, res) => {
  try {
    const results = await salesServices.getAllSales();
    if (results.error) {
      return res.status(results.code).json({ message: results.error });
    }
    return res.status(httpStatus.OK).json(results);
  } catch (error) {
    return res.status(httpStatus.INTERNAL_SERVER).json({
      message: 'Erro interno no servidor',
    });
  }
};

const findSalesById = async (req, res) => {
  const { id } = req.params;
  try {
    const results = await salesServices.findSalesById(id);
    if (results.error) {
      return res.status(results.code).json({ message: results.error });
    }
    return res.status(httpStatus.OK).json(results);
  } catch (error) {
    return res.status(httpStatus.INTERNAL_SERVER).json({
      message: 'Erro interno no servidor',
    });
  }
};

module.exports = {
  newSale,
  getAllSales,
  findSalesById,
};
