const httpStatus = require('../helpers/httpStatusCodes');
const salesServices = require('../services/salesServices');
const messages = require('../helpers/messages');

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
      message: messages.INTERNAL_SERVER_ERROR_MSG,
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
      message: messages.INTERNAL_SERVER_ERROR_MSG,
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
      message: messages.INTERNAL_SERVER_ERROR_MSG,
    });
  }
};

const updateSalesById = async (req, res) => {
  const { id } = req.params; const newSaleArray = req.body;
  try {
    const results = await salesServices.updateSalesById(id, newSaleArray);
    if (results.error) return res.status(results.code).json({ message: results.error });
    return res.status(httpStatus.OK).json(results);
  } catch (error) {
    return res.status(httpStatus.INTERNAL_SERVER).json({
      message: messages.INTERNAL_SERVER_ERROR_MSG,
    });
  }
};

const deleteSalesById = async (req, res) => {
  const { id } = req.params;
  try {
    const results = await salesServices.deleteSalesById(id);
    if (results.error) {
      return res.status(results.code).json({ message: results.error });
    }
    return res.status(httpStatus.NO_CONTENT).json(results);
  } catch (error) {
    return res.status(httpStatus.INTERNAL_SERVER).json({
      message: messages.INTERNAL_SERVER_ERROR_MSG,
    });
  }
};

module.exports = {
  newSale,
  getAllSales,
  findSalesById,
  deleteSalesById,
  updateSalesById,
};
