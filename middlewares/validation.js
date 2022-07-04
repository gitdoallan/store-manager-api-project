const httpStatus = require('../helpers/httpStatusCodes');

const validateName = (req, res, next) => {
  const { name } = req.body;
  if (!name) {
    return res.status(httpStatus.BAD_REQUEST).json({
      message: '"name" is required',
    });
  }
  next();
};

const validateQuery = (req, res, next) => {
  const { q } = req.query;
  if (!q) {
    return res.status(httpStatus.BAD_REQUEST).json({
      message: '"q" is required',
    });
  }
  next();
};

module.exports = {
  validateName,
  validateQuery,
};
