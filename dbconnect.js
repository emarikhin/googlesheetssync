const mysql = require('mysql');

const con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "eMaD2Hc::w+F$-",
    database: "ssantav1"
});

module.exports = con;