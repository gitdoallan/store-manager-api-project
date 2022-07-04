const express = require('express');
const productsRouter = require('./productsRouter');
const salesRouter = require('./salesRouter');

const router = express.Router();

router.use('/products', productsRouter);

router.use('/sales', salesRouter);

module.exports = router;
