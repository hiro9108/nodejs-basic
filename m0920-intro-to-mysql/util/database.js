const mysql = require('mysql2')
require('dotenv').config()

const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD
})

module.exports = pool.promise()

//Sorry.... please dont push anything if you forked my repo.
//I forgot to add .env in .gitignore :<

//I removed it now.... you may clone/fork