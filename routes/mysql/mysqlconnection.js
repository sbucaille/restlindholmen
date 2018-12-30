/*
 * Developed by Steven BUCAILLE on 11/26/18 6:58 PM.
 * Last modified 11/24/18 1:43 PM.
 * Copyright (c) 2018. All right reserved.
 *
 */

let knex = require('knex');
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

let test = async () => {
	let select1 = db.select().from(dbshema.tableNames.diagram);
	for (let i = 0; i < 5; i++) {
		select1 = select1.orWhere(dbshema.tableContent.diagram.id, '=', i);
	}

	console.log(select1.toString());
	let result = await select1;
	console.log(result);
}

test();

module.exports = {
	"knex" : db,
	"dbshema" : dbshema
};
