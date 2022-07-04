const express = require('express');
const productsController = require('../controllers/productsController');
const middleware = require('../middlewares/validation');

const router = express.Router();

router.get('/', productsController.getAllProducts);

router.post('/', middleware.validateName, productsController.newProduct);

router.get('/search', productsController.searchProduct);

router.get('/:id', productsController.findProductById);

router.put('/:id', middleware.validateName, productsController.updateProduct);

router.delete('/:id', productsController.deleteProduct);

module.exports = router;
