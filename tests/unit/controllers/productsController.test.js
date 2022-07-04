const sinon = require('sinon');
const { expect } = require('chai');
const productsServices = require('../../../services/productsServices');
const productsController = require('../../../controllers/productsController');
const httpStatus = require('../../../helpers/httpStatusCodes');

const mock = require('../mocks');

describe('Testando o productsController', async () => {
  const req = {};
  const res = {};

  before(() => {
    req.body = {};
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);

    sinon.stub(productsServices, 'getAllProducts').resolves(true);
  });

  after(() => {
    productsServices.getAllProducts.restore();
  });

  it('Deve retornar status 200', async () => {
    await productsController.getAllProducts(req, res);
    expect(res.status.calledWith(httpStatus.OK)).to.be.true;
  });
});