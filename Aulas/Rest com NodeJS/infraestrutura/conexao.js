const mysql = require('mysql')

const connectMysql = mysql.createConnection({
    host: 'localhost',
    port: '3306',
    user: 'root',
    password: '1402',
    database: 'agendaPetShop',
})

module.exports = connectMysql

