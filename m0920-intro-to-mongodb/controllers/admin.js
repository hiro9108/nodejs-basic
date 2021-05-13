const Product = require('../models/Products')

exports.getAddProducts = (req, res, next) => {
  res.render('admin/edit-product', {
    pageTitle: 'Add a product',
    editing: false,
  })
}

exports.postAddProduct = (req, res, next) => {
  const product = new Product(
    req.body.title,
    addZeroes(req.body.price),
    req.body.description,
    req.body.imageUrl
  )
  product.save()
  res.redirect('/')
}

exports.getEditProduct = (req, res, next) => {
  const editMode = req.query.edit
  if (!editMode) {
    return res.redirect('/')
  }
  Product.findById(req.params.productId)
    .then((product) => {
      res.render('admin/edit-product', {
        pageTitle: 'Edit Product',
        editing: editMode,
        product: product,
      })
    })
    .catch((err) => console.log(err))
}

exports.postEditProduct = (req, res, next) => {
  const prodId = req.body.productId
  const updatedTitle = req.body.title
  const updatePrice = req.body.price
  const updateDesc = req.body.descrption
  const updatedImageUrl = req.body.imageUrl

  const updatedProduct = new Product(
    updatedTitle,
    updatePrice,
    updateDesc,
    updatedImageUrl
  )

  updatedProduct.edit(prodId).then(() => {
    //   res.redirect('/')
    res.redirect('/show-product/'+prodId)
  }).catch(err => console.log(err))
  
}

exports.deleteProduct = (req, res, next) => {
  const prodId = req.body.productId
  Product.deleteById(prodId)
  res.redirect('/')
}

function addZeroes(num) {
  const dec = num.split('.')[1]
  const len = dec && dec.length > 2 ? dec.length : 2
  return Number(num).toFixed(len)
}
