/*
 * Developed by Steven BUCAILLE on 11/26/18 6:58 PM.
 * Last modified 11/24/18 9:07 PM.
 * Copyright (c) 2018. All right reserved.
 *
 */

let knex = require('../../mysql/mysqlconnection').knex;
let dbshema = require('../../../dbschema').db;
let resultManipulation = require('../../mysql/resultManipulation');

let getListOfClassIDs = async () => {
	return resultManipulation.getArrayFromResult(await knex.select('id').from('cd_class'));
};

let getListOfAttributeIDs = async (classId) => {
	return getArrayFromResult(
		await knex.select('id').from('cd_attribute').where('cls_id', '=', classId)
	)
};

let getListOfClassIDsFromClassDiagram = async (classDiagramID) => {
	return getArrayFromResult(
		await knex.select('id')
			.from(dbshema.tableNames.class)
			.where(dbshema.contentNames.class.classDiagramID, '=', classDiagramID)
	)
}

module.exports = {
	getListOfClassIDs : getListOfClassIDs,
	getListOfAttributeIDs : getListOfAttributeIDs,
	getListOfClassIDsFromClassDiagram : getListOfClassIDsFromClassDiagram
};