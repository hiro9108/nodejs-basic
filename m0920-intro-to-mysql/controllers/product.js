const Product = require('../models/Products')
const Cart = require('../models/Cart')

exports.getAddProducts = (req,res,next) => {
    res.render('add-product', {
        pageTitle: 'Add a product'
    })
}

exports.postAddProduct = (req,res,next) => {
    const product = new Product(
        null, 
        req.body.title, 
        addZeroes(req.body.price),
        req.body.description,
        req.body.imageUrl
    )
    product.save()
    res.redirect('/')
}

exports.getProducts = (req,res,next) => {

    Product.fetchAll().then(([rows, fieldData]) => {
        res.render('shop', {
            pageTitle: 'Shop Page',
            products: rows
        })
    }).catch(err => console.log(err))
    
}

exports.getOneProductById = (req,res,next) => {
    Product.findById(req.params.id).then(([row, fieldData]) => {
        res.render('product', {
            pageTitle: row[0].title,
            product: row[0]
        })
    }).catch(err => console.log(err))
}

exports.deleteProduct = (req,res,next) => {
    const prodId = +req.body.productId
    Product.deleteById(prodId)
    res.redirect('/')
}

exports.postCart = (req,res,next) => {
    const prodId = +req.body.productId
    const fetchProduct = Product.fetchOneProductById(prodId)

    Cart.addProduct(fetchProduct.id, fetchProduct.price)
    // res.render('cart',)
    res.redirect('/')
}

function addZeroes(num) {
    const dec = num.split('.')[1]
    const len = dec && dec.length > 2 ? dec.length : 2
    return Number(num).toFixed(len)
}