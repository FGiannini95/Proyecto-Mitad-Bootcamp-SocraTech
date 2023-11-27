const mysql = require('mysql2');
const connection = mysql.createConnection({
  host    : 'localhost',
  user    : 'root',
  password: 'root',
  database: 'restaurnats',
});

connection.connect(function(err){
  if(err){
    console.log('error connecting' + err.stack);
    return;
  }
  console.log('Base de datos conectada correctamente');
});

module.exports = connection;