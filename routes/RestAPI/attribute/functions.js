/*
 * Developed by Steven BUCAILLE on 11/26/18 6:58 PM.
 * Last modified 11/26/18 11:33 AM.
 * Copyright (c) 2018. All right reserved.
 *
 */

let knex = require('../../mysql/mysqlconnection').knex;
let dbshema = require('../../mysql/mysqlconnection').dbshema;
let attributeTableName = dbshema.tableNames.attribute;
let classDiagramTableName = dbshema.tableNames.classdiagram;

let getListOfAttributeIds = async () => {
	let results = await knex.select('id').from(attributeTableName);
	let tabOfIds = [];
	results.forEach((result) => {
		tabOfIds.push(result.id)
	});
	return tabOfIds;
};

let getAttributeInfoFromID = async (id) => {
	let result = await knex.select('*').from(attributeTableName).where('id', '=', id);
	return result[0];
};

let getListOfAttributeIdsFromClassDiagram = async (cdId) => {
	//TODO
	//let results = await knex.select('*').from(attributeTableName).join(classDiagramTableName).where()
};

let getListOfAttributeIdsFromClass = async (classId) => {
	//TODO

};

let getCriteriasFromRequest = async (criteria) => {
	console.log(criteria);
}

module.exports = {
	getListOfAttributeIds: getListOfAttributeIds,
	getAttributeInfoFromID: getAttributeInfoFromID,
	getListOfAttributeIdsFromClassDiagram: getListOfAttributeIdsFromClassDiagram,
	getListOfAttributeIdsFromClass: getListOfAttributeIdsFromClass,
	getCriteriasFromRequest: getCriteriasFromRequest
};