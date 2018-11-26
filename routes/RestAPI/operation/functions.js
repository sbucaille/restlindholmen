/*
 * Developed by Steven BUCAILLE on 11/26/18 6:58 PM.
 * Last modified 11/19/18 10:26 PM.
 * Copyright (c) 2018. All right reserved.
 *
 */

let knex = require('../../mysql/mysqlconnection').knex;

let getListOfClassIds = async () => {
	let results = await knex.select('id').from('cd_class');
	let tabOfIds = [];
	results.forEach((result)=> {
		tabOfIds.push(result.id)
	});
	return tabOfIds;
}

module.exports = {
	getListOfClassIds : getListOfClassIds
};