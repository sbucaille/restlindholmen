/*
 * Developed by Steven BUCAILLE on 11/26/18 6:58 PM.
 * Last modified 11/19/18 10:26 PM.
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
let getAllMethodParamsID = async () => {
	return resultManipulation.getArrayFromResult(
		await knex
			.select(dbTableContent.methodParam.id)
			.from(dbTableNames.methodParam)
	)
};

/**
 * EntityInfo typed query.
 * @param methodParamID
 * @returns {Promise<void>}
 */
let getMethodParamInfo = async (methodParamID) => {
	return await knex
		.select()
		.from(dbTableNames.methodParam)
		.whereIn(
			dbTableContent.methodParam.id,
			methodParamID
		)
};

/**
 * ParameterLinked typed query.
 * @param methodID
 * @returns {Promise<{}>}
 */
let getMethodParamsFromMethod = async (methodID) => {
	return resultManipulation.getResultWithLinkedParameter(
		await knex
			.select(
				dbTableContent.methodParam.methodID + ' as parameter',
				dbTableContent.methodParam.id
			)
			.from(dbTableNames.methodParam)
			.whereIn(
				dbTableContent.methodParam.methodID,
				methodID
			)
	)
};

module.exports = {
	getAllMethodParamsID: getAllMethodParamsID,
	getMethodParamInfo: getMethodParamInfo,
	getMethodParamsFromMethod: getMethodParamsFromMethod
};