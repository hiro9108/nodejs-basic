const express = require('express');
const path = require('path');
const fs = require('fs');
const productsData = require('../models/Products');

const rootDirectory = require('../util/path');

const router = express.Router();

router.get('/', (req, res, next) => {
    // res.sendFile(path.join(rootDirectory, 'views', 'shop.html'));
    const data = fs.readFileSync(path.join(rootDirectory, 'models', 'Products.json'));
    const prodData = JSON.parse(data);

    //utility function to generate rendered view
    res.render('shop', {
        pageTitle: 'Shop Page',
        products: prodData
    });
});

//---------------------------- export method 1
module.exports = router;