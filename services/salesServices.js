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

const checkUpdated = async (id, updatedArray) => {
  updatedArray.forEach(async (e) => {
    if (!e.quantity) {
      return {
        error: '"quantity" is required',
        code: httpStatus.BAD_REQUEST,
      };
    }
    if (!e.productId) {
      return {
        error: '"productId" is required',
        code: httpStatus.BAD_REQUEST,
      };
    }
    // TODO: mandar para middleware
    await salesModel.updateSalesById(id, e.productId, e.quantity);
  });
  return false;
};

const updateSalesById = async (id, updatedArray) => {
  const checkQuantity = await verifyQuantity(updatedArray);
  if (checkQuantity) return { error: checkQuantity.error, code: checkQuantity.code };
  const checkProductId = await verifyProducts(updatedArray);
  if (checkProductId) return { error: checkProductId.error, code: checkProductId.code };
  const result = await checkUpdated(id, updatedArray);
  if (result) return result;
  const findSale = await findSalesById(id);
  if (findSale.error) return findSale;
  return { saleId: id, itemsUpdated: updatedArray };
};

const deleteSalesById = async (id) => {
  const sale = await salesModel.findSalesById(id);
  if (!sale) return { error: 'Sale not found', code: httpStatus.NOT_FOUND };
  const result = await salesModel.deleteSalesById(id);
  return result;
};

module.exports = {
  newSale,
  getAllSales,
  findSalesById,
  deleteSalesById,
  updateSalesById,
};