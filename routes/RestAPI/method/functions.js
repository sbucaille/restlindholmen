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
let getAllMethodsID = async () => {
	return resultManipulation.getArrayFromResult(
		await knex
			.select(dbTableContent.method.id)
			.from(dbTableNames.method)
	)
};

/**
 * EntityInfo typed query.
 * @param methodID
 * @returns {Promise<void>}
 */
let getMethodInfo = async (methodID) => {
	return await knex
		.select()
		.from(dbTableNames.method)
		.whereIn(
			dbTableContent.method.id,
			methodID
		)
};

/**
 * ParameterLinked typed query.
 * @param classID
 * @returns {Promise<{}>}
 */
let getMethodsFromClass = async (classID) => {
	return resultManipulation.getResultWithLinkedParameter(
		await knex
			.select(
				dbTableContent.method.classID + ' as parameter',
				dbTableContent.method.id
			)
			.from(dbTableNames.method)
			.whereIn(
				dbTableContent.method.classID,
				classID
			)
	)
};

/**
 * ParameterLinked typed query.
 * @param methodParamID
 * @returns {Promise<{}>}
 */
let getMethodsFromMethodParam = async (methodParamID) => {
	return resultManipulation.getResultWithLinkedParameter(
		await knex
			.select(
				dbTableContent.methodParam.id + ' as parameter',
				dbTableContent.methodParam.methodID
			)
			.from(dbTableNames.methodParam)
			.whereIn(
				dbTableContent.methodParam.id,
				methodParamID
			)
	)
};

module.exports = {
	getAllMethodsID: getAllMethodsID,
	getMethodInfo: getMethodInfo,
	getMethodsFromClass: getMethodsFromClass,
	getMethodsFromMethodParam: getMethodsFromMethodParam
};