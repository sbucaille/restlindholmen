/*
 * Developed by Steven BUCAILLE on 11/26/18 6:58 PM.
 * Last modified 11/24/18 7:27 PM.
 * Copyright (c) 2018. All right reserved.
 *
 */

let knex = require('../../mysql/mysqlconnection').knex;
let dbshema = require('../../mysql/mysqlconnection').dbshema;
let checkFunctions = require('./check');

let getListOfIds = async (table) => {

	let results = await knex.select('id').from(tableName);
	let tabOfIds = [];
	results.forEach((result) => {
		tabOfIds.push(result.id);
	});
	return tabOfIds;
};

let getElementInfoFromID = async (table, id) => {
	return await knex.select('*').from(table).where('id', '=', id);
};

let getListOfElementFromClass = async (table, id) => {
	if (table != null) {

	}
}

module.exports = {
	getListOfIds: getListOfIds,
	getElementInfoFromID: getElementInfoFromID,
	getListOfElementFromClass: getListOfElementFromClass
}