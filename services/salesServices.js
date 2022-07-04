const salesModel = require('../models/salesModel');
const productsServices = require('./productsServices');
const httpStatus = require('../helpers/httpStatusCodes');

const verifyProducts = async (newSaleArray) => {
  const noIdFound = newSaleArray.find((e) => !e.productId);
  if (noIdFound) {
    return {
      error: '"productId" is required',
      code: httpStatus.BAD_REQUEST,
    };
  }
  const products = await productsServices.getAllProducts();
  const productIdsNotFound = newSaleArray.find((e) => !products.find((p) => p.id === e.productId));
  if (productIdsNotFound) {
    return {
      error: 'Product not found',
      code: httpStatus.NOT_FOUND,
    };
  }
  return false;
};

const verifyQuantity = async (newSaleArray) => {
  const belowOrEqualZero = newSaleArray.find((e) => +e.quantity <= 0);
  if (belowOrEqualZero) {
    return {
      error: '"quantity" must be greater than or equal to 1',
      code: httpStatus.INVALID_ARGUMENT,
    };
  }
  const noQuantityDefined = newSaleArray.find((e) => !e.quantity);
  if (noQuantityDefined) {
    return {
      error: '"quantity" is required',
      code: httpStatus.BAD_REQUEST,
    };
  }
  return false;
};

const newSale = async (newSaleArray) => {
  const lastSaleId = await salesModel.getLastSaleId();
  const checkQuantity = await verifyQuantity(newSaleArray);
  if (checkQuantity) return { error: checkQuantity.error, code: checkQuantity.code };
  const checkProductId = await verifyProducts(newSaleArray);
  if (checkProductId) return { error: checkProductId.error, code: checkProductId.code };
  await salesModel.newSale();
  newSaleArray.forEach(async (e) => {
    await salesModel.newProductSale(lastSaleId, e.productId, e.quantity);
  });
  return { id: lastSaleId + 1, itemsSold: newSaleArray };
};

const getAllSales = async () => {
  const sales = await salesModel.getAllSales();
  if (!sales) return { error: 'No sales found', code: httpStatus.NOT_FOUND };
  return sales;
};

const findSalesById = async (id) => {
  const sale = await salesModel.findSalesById(id);
  if (!sale) return { error: 'Sale not found', code: httpStatus.NOT_FOUND };
  return sale;
};

module.exports = {
  newSale,
  getAllSales,
  findSalesById,
};