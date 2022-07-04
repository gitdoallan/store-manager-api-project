const express = require('express');
const salesController = require('../controllers/salesController');

const router = express.Router();

router.post('/', salesController.newSale);
router.get('/', salesController.getAllSales);
router.get('/:id', salesController.findSalesById);
router.delete('/:id', salesController.deleteSalesById);

module.exports = router;
