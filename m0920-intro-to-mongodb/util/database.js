const mongodb = require('mongodb')
require('dotenv').config()

const MongoClient = mongodb.MongoClient

let db

exports.mongoConnect = (callback) => {
    MongoClient.connect(process.env.MONGODB_URL, { 
        useNewUrlParser: true,
        useUnifiedTopology: true
    }).then(client => {
        console.log('Connected to Database')
        db = client.db('m0920-shop')
        callback()
    }).catch(err => console.log(err))
}

exports.getDB = () => {
    if(db){
        return db
    }else{
        throw 'No database found'
    }
}



// const mongoConnect = () => {
//     MongoClient.connect(process.env.MONGODB_URL).then(client => {
//         console.log(client)
//     }).catch(err => console.log(err))
// }

// mongoConnect()

//module.exports = mongoConnect