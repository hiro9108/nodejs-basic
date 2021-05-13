const mongodb = require('mongodb')
const getDB = require('../util/database').getDB

module.exports = class Product {
  constructor(title, price, description, imageUrl) {
    // this.id = id
    this.title = title
    this.price = price
    this.description = description
    this.imageUrl = imageUrl
  }

  save() {
    const db = getDB()
    return db.collection('products').insertOne(this)
  }

  edit(id){
    const db = getDB()
    return db
      .collection('products')
      .updateOne({ _id: new mongodb.ObjectID(id) }, { $set: this })
  }

  static fetchAll() {
    const db = getDB()
    return db.collection('products').find().toArray()
  }

  static findById(id) {
    const db = getDB()
    // return db.collection('products').find({ _id: mongodb.ObjectID(id) }).next()
    return db.collection('products').findOne({ _id: mongodb.ObjectID(id) })
  }

  static deleteById(id) {
    console.log(id)
    const db = getDB()
    return db.collection('products').deleteOne({ _id: mongodb.ObjectID(id)})
  }
}
