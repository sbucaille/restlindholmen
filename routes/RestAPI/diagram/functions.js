/*
 * Developed by Steven BUCAILLE on 11/26/18 6:58 PM.
 * Last modified 11/19/18 9:27 PM.
 * Copyright (c) 2018. All right reserved.
 *
 */

let knex = require('../../mysql/mysqlconnection').knex;
let dbSchema = require('../../../dbschema').db;
let dbTableNames = dbSchema.tableNames;
let dbTableContent = dbSchema.tableContent;
let resultManipulation = require('../../mysql/resultManipulation');

let getAllDiagramsID = async () => {
	return resultManipulation.getArrayFromResult(
		await knex
			.select('id')
			.from(dbTableNames.classDiagram)
	)
};

let getDiagramIDFromClass = async (classID) => {
	return await knex
		.select(
			dbTableContent.class.id + ' as parameter',
			dbTableContent.class.classDiagramID
		)
		.from(dbTableNames.class)
		.whereIn(dbTableContent.class.id, classID)
		.debug()
};

let getDiagramIDFromAttribute = async (attributeID) => {
	return await knex
		.select(
			dbTableNames.attribute + '.' + dbTableContent.attribute.id + ' as parameter',
			dbTableContent.class.classDiagramID
		)
		.from(dbTableNames.class)
		.innerJoin(
			dbTableNames.attribute,
			dbTableNames.class + '.' + dbTableContent.class.id,
			'=',
			dbTableNames.attribute + '.' + dbTableContent.attribute.classID
		)
		.whereIn(
			dbTableNames.attribute + '.' + dbTableContent.attribute.id,
			attributeID
		)
};

let getDiagramIDFromMethod = async (methodID) => {
	return await knex
		.select(
			dbTableNames.method + '.' + dbTableContent.method.id + ' as parameter',
			dbTableContent.class.classDiagramID
		)
		.from(dbTableNames.class)
		.innerJoin(
			dbTableNames.method,
			dbTableNames.class + '.' + dbTableContent.class.id,
			'=',
			dbTableNames.method + '.' + dbTableContent.method.classID
		)
		.whereIn(
			dbTableNames.method + '.' + dbTableContent.method.id,
			methodID
		)
};

let getDiagramIDFromMethodParameter = async (methodParameterID) => {
	return await knex
		.select(
			dbTableNames.methodParam + '.' + dbTableContent.methodParam.id + ' as parameter',
			dbTableContent.class.classDiagramID
		)
		.from(dbTableNames.class)
		.innerJoin(
			dbTableNames.method,
			dbTableNames.class + '.' + dbTableContent.class.id,
			'=',
			dbTableNames.method + '.' + dbTableContent.method.classID
		)
		.innerJoin(
			dbTableNames.methodParam,
			dbTableNames.method + '.' + dbTableContent.method.id,
			'=',
			dbTableNames.methodParam + '.' + dbTableContent.methodParam.methodID
		)
		.whereIn(
			dbTableNames.methodParam + '.' + dbTableContent.methodParam.id,
			methodParameterID
		)
};

let getDiagramIDFromAssociation = async (associationID) => {
	return await knex
		.select(
			dbTableContent.association.id + ' as parameter',
			dbTableContent.association.classDiagramID
		)
		.from(dbTableNames.association)
		.whereIn(dbTableContent.association.id, associationID)
};

let getDiagramIDFromAssociationEnd = async (associationEndID) => {
	return await knex
		.select(
			dbTableContent.associationEnd.id + ' as parameter',
			dbTableContent.associationEnd.classDiagramID
		)
		.from(dbTableNames.associationEnd)
		.whereIn(dbTableContent.associationEnd.id, associationEndID)
};

let getDiagramIDFromDependency = async (dependencyID) => {
	return await knex
		.select(
			dbTableContent.dependency.id + ' as parameter',
			dbTableContent.dependency.classDiagramID
		)
		.from(dbTableNames.dependency)
		.whereIn(dbTableContent.dependency.id, dependencyID)
};

let getDiagramIDFromRealization = async (realizationID) => {
	return await knex
		.select(
			dbTableContent.realization.id + ' as parameter',
			dbTableContent.realization.classDiagramID
		)
		.from(dbTableNames.realization)
		.whereIn(dbTableContent.realization.id, realizationID)
};

let getDiagramIDFromGeneralization = async (generalizationID) => {
	return await knex
		.select(
			dbTableContent.generalization.id + ' as parameter',
			dbTableContent.generalization.classDiagramID
		)
		.from(dbTableNames.generalization)
		.whereIn(dbTableContent.generalization.id, generalizationID)
};

module.exports = {
	getAllDiagramsID: getAllDiagramsID,
	getDiagramIDFromClass: getDiagramIDFromClass,
	getDiagramIDFromAttribute: getDiagramIDFromAttribute,
	getDiagramIDFromMethod: getDiagramIDFromMethod,
	getDiagramIDFromMethodParameter: getDiagramIDFromMethodParameter,
	getDiagramIDFromAssociation: getDiagramIDFromAssociation,
	getDiagramIDFromAssociationEnd: getDiagramIDFromAssociationEnd,
	getDiagramIDFromDependency: getDiagramIDFromDependency,
	getDiagramIDFromRealization: getDiagramIDFromRealization,
	getDiagramIDFromGeneralization: getDiagramIDFromGeneralization
};