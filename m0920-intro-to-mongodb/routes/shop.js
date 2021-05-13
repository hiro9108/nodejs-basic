const express = require('express');
// const productsController = require('../controllers/product')
const shopController = require('../controllers/shop')

const router = express.Router();

router.get('/', shopController.getProducts);
router.get('/show-product/:id', shopController.getOneProductById)
router.post('/cart', shopController.postCart)

module.exports = router;