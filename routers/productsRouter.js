const express = require('express');
const productsController = require('../controllers/productsController');

const router = express.Router();

router.get('/', productsController.getAllProducts);

router.post('/', productsController.newProduct);

router.get('/search', productsController.searchProduct);

router.get('/:id', productsController.findProductById);

router.put('/:id', productsController.updateProduct);

router.delete('/:id', productsController.deleteProduct);

module.exports = router;
