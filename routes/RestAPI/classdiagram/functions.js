/*
 * Developed by Steven BUCAILLE on 11/26/18 6:58 PM.
 * Last modified 11/19/18 9:27 PM.
 * Copyright (c) 2018. All right reserved.
 *
 */

let knex = require('../../mysql/mysqlconnection').knex;

let getClassDiagramByName = async (clsname) => {
	let results = await knex.select().from('cd_class').where('cls_name', 'LIKE', "'%'" + clsname + "'%'");
	console.log(results);
	return results;
}

let getListOfClassDiagramIds = async () => {
	let results = await knex.select('id').from('xmi');
	let tabOfIds = [];
	results.forEach((result)=> {
		tabOfIds.push(result.id)
	});
	return tabOfIds;
}

module.exports = {
	getClassDiagramByName : getClassDiagramByName,
	getListOfClassDiagramIds : getListOfClassDiagramIds
};