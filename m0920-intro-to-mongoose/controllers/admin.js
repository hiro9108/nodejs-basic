const Product = require('../models/Products')

exports.getAddProduct = (req, res, next) => {
  res.render('admin/edit-product', {
    pageTitle: 'Add a product',
    editing: false,
  })
}

exports.postAddProduct = (req, res, next) => {
  const product = new Product({
    title: req.body.title,
    price: req.body.price,
    description: req.body.description,
    imageUrl: req.body.imageUrl,
    userId: req.user
  })
  product.save().then(() => {
    res.redirect('/')
  }).catch(err => console.log(err))
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
  const updatedPrice = req.body.price
  const updateDesc = req.body.description
  const updatedImageUrl = req.body.imageUrl

  Product.findById(prodId).then(product => {
    product.title = updatedTitle,
    product.price = updatedPrice,
    product.description = updateDesc,
    product.imageUrl = updatedImageUrl
    return product.save()
  })
  .then(() => {
    res.redirect('/show-product/' + prodId)
  })
  .catch(err => console.log(err))
}

exports.deleteProduct = (req, res, next) => {
  const prodId = req.body.productId
  Product.findOneAndRemove(prodId).then(() => {
    console.log('DESTROYED PRODUCT')
    res.redirect('/')
  }).catch(err => console.log(err))
}
