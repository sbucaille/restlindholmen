let mysql = require('mysql');
let auth = require('../../auth').mysql;

var connection = mysql.createConnection({
	host     : 'localhost',
	user     : auth.user,
	password : auth.password,
	database : auth.dbname
});

connection.connect();

connection.query('SELECT 1 + 1 AS solution', function (error, results, fields) {
	if (error) throw error;
	console.log('The solution is: ', results[0].solution);
});

connection.end();