/*
 * Developed by Steven BUCAILLE on 11/26/18 6:58 PM.
 * Last modified 11/24/18 1:43 PM.
 * Copyright (c) 2018. All right reserved.
 *
 */

let mysql = require('mysql');
let auth = require('../../auth').mysql;
let dbshema = require('../../dbschema').db;

let db = require('knex')({
	client: 'mysql',
	connection: {
		host 		: 'localhost',
		user 		: auth.user,
		password 	: auth.password,
		database 	: auth.dbname
	}
});

let connection = mysql.createConnection({
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

module.exports = {
	"connection" : connection,
	"knex" : db,
	"dbshema" : dbshema
};
