const express = require('express');
const productsController = require('../controllers/productsController');

const router = express.Router();

router.get('/', productsController.getAllProducts);

router.post('/', productsController.newProduct);

router.get('/:id', productsController.findProductById);

module.exports = router;
