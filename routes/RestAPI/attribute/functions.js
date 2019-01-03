/*
 * Developed by Steven BUCAILLE on 11/26/18 6:58 PM.
 * Last modified 11/26/18 11:33 AM.
 * Copyright (c) 2018. All right reserved.
 *
 */

let knex = require('../../mysql/mysqlconnection').knex;
let dbSchema = require('../../../dbschema').db;
let dbTableNames = dbSchema.tableNames;
let dbTableContent = dbSchema.tableContent;
let resultManipulation = require('../../mysql/resultManipulation');

/**
 * Array typed query.
 * @returns {Promise<Array>}
 */
let getAllAttributesID = async () => {
	return resultManipulation.getArrayFromResult(
		await knex
			.select(dbTableContent.attribute.id)
			.from(dbTableNames.attribute)
	)
};

/**
 * EntityInfo typed query.
 * @param attributeID
 * @returns {Promise<void>}
 */
let getAttributeInfo = async (attributeID) => {
	return await knex
		.select()
		.from(dbTableNames.attribute)
		.whereIn(
			dbTableContent.attribute.id,
			attributeID
		)
};

/**
 * ParameterLinked typed query.
 * @param classID
 * @returns {Promise<{}>}
 */
let getAttributesFromClass = async (classID) => {
	return resultManipulation.getResultWithLinkedParameter(
		await knex
			.select(
				dbTableContent.attribute.classID + ' as parameter',
				dbTableContent.attribute.id
			)
			.from(dbTableNames.attribute)
			.whereIn(
				dbTableContent.attribute.classID,
				classID
			)
	)
};

module.exports = {
	getAllAttributesID: getAllAttributesID,
	getAttributeInfo: getAttributeInfo,
	getAttributesFromClass: getAttributesFromClass
};