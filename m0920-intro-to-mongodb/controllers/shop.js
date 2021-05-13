const Product = require('../models/Products')
const Cart = require('../models/Cart')


exports.getProducts = (req,res,next) => {
    Product.fetchAll().then((products) => {
        res.render('shop', {
            pageTitle: 'Shop Page',
            products: products
        })
    }).catch(err => console.log(err))
    
}

exports.getOneProductById = (req,res,next) => {
    Product.findById(req.params.id).then((product) => {
        console.log(product)
        res.render('product', {
            pageTitle: product.title,
            product: product
        })
    }).catch(err => console.log(err))
}

exports.postCart = (req,res,next) => {
    const prodId = req.body.productId
    const fetchProduct = Product.fetchOneProductById(prodId)

    Cart.addProduct(fetchProduct.id, fetchProduct.price)
    // res.render('cart',)
    res.redirect('/')
}