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

module.exports = {
  newSale,
};
