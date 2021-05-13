const fs = require('fs')
const path = require('path')

const rootDirectory = require('../util/path')

const dataPath = path.join(rootDirectory, 'data', 'Cart.json')

module.exports = class Cart{
    static addProduct(id, productPrice){
        
        fs.readFile(dataPath, (err, data) => {

            let cart = { 
                products: [],
                totalPrice: 0
            }

            if(!err){
                cart = JSON.parse(data)
            }

            //find existing product
            const existingProductIndex = cart.products.findIndex(prod => prod.id === id)
            const existingProduct = cart.products[existingProductIndex]

            let updatedProduct
            //add new product?? or.... increase quantity
            if(existingProduct){
                updatedProduct = { ...existingProduct }
                updatedProduct.qty = updatedProduct.qty + 1

                cart.products = [...cart.products]
                cart.products[existingProductIndex] = updatedProduct
            }else{
                updatedProduct = {
                    id,
                    qty: 1
                }
                cart.products = [...cart.products, updatedProduct]
            }

            cart.totalPrice = cart.totalPrice + +productPrice

            fs.writeFile(dataPath, JSON.stringify(cart, null, 2), (err) => {
                if(err) throw err
            })
        })
        
    }
}