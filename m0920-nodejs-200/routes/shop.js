const express = require('express');
const productsController = require('../controllers/product')

const router = express.Router();

router.get('/', productsController.getProducts);

router.get('/show-product/:id', productsController.getOneProductById)

router.post('/delete-product', productsController.deleteProduct)

module.exports = router;