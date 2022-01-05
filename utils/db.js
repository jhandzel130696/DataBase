const mysql = require("mysql2/promise");
const pool =  mysql.createPool({
    host:'localhost',
    port:'8889',
    user:'root',
    password:'root',
    database:'megaK_santa',
    namedPlaceholders:true,
    decimalNumbers:true,
});

module.exports={
    pool,
}