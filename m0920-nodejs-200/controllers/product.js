const Product = require('../models/Products')

exports.getAddProducts = (req,res,next) => {
    res.render('add-product', {
        pageTitle: 'Add a product'
    })
}

exports.postAddProduct = (req,res,next) => {
    const product = new Product(req.body.name, addZeroes(req.body.price))
    product.save()
    res.redirect('/')
}

exports.getProducts = (req,res,next) => {
    //-----ASYNC WAY
    //create our own callback process
    // Product.fetchAll((fetchedProducts) => {
    //     console.log('fetched: ',fetchedProducts)
    //     res.render('shop', {
    //         pageTitle: 'Shop Page',
    //         products: fetchedProducts
    //     })
    // })

    //-----SYNC WAY
    const fetchedProducts = Product.fetchAllSync()
    res.render('shop', {
        pageTitle: 'Shop Page',
        products: fetchedProducts
    })
    //to test for insomnia
    // res.json(fetchedProducts)
}

exports.getOneProductById = (req,res,next) => {
    const fetchProduct = Product.fetchOneProductById(+req.params.id)
    if(fetchProduct.msg){
        res.render('404', {
            pageTitle: 'PAGE NOT FOUND',
            message: fetchProduct.msg
        })
    }else{
        res.render('product', {
            pageTitle: fetchProduct.name,
            product: fetchProduct
        })
        //to test for insomnia
        // res.json(fetchProduct)
    }
}

exports.deleteProduct = (req,res,next) => {
    const prodId = +req.body.productId
    Product.deleteById(prodId)
    res.redirect('/')
}

function addZeroes(num) {
    const dec = num.split('.')[1]
    const len = dec && dec.length > 2 ? dec.length : 2
    return Number(num).toFixed(len)
}