const express = require('express');
// const productsController = require('../controllers/product')
const adminController = require('../controllers/admin')

const router = express.Router();

router.get('/add-products', adminController.getAddProducts);
router.post('/add-product', adminController.postAddProduct);
router.get('/edit-product/:productId', adminController.getEditProduct)
router.post('/edit-product', adminController.postEditProduct)
router.post('/delete-product', adminController.deleteProduct)

module.exports = router;