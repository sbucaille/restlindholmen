/*
 * Developed by Steven BUCAILLE on 11/26/18 6:58 PM.
 * Last modified 11/19/18 9:27 PM.
 * Copyright (c) 2018. All right reserved.
 *
 */

let knex = require('../../mysql/mysqlconnection').knex;
let dbshema = require('../../../dbschema').db;
let resultManipulation = require('../../mysql/resultManipulation');

let getAllDiagramsID = async () => {
	return resultManipulation.getArrayFromResult(
		await knex
			.select('id')
			.from(dbshema.tableNames.classDiagram)
	)
};

let getDiagramIDFromClass = async (classID) => {
	return await knex
		.select(dbshema.contentNames.class.classDiagramID)
		.from(dbshema.tableNames.class)
		.where(dbshema.contentNames.class.id, '=', classID)
};

let getDiagramIDFromAttribute = async (attributeID) => {
	return await knex
		.select(dbshema.contentNames.class.classDiagramID)
		.from(dbshema.tableNames.class)
		.innerJoin(
			dbshema.tableNames.attribute,
			dbshema.tableNames.class + '.' + dbshema.contentNames.class.id,
			'=',
			dbshema.tableNames.attribute + '.' + dbshema.contentNames.attribute.classID
		)
		.where(
			dbshema.tableNames.attribute + '.' + dbshema.contentNames.attribute.id,
			'=',
			attributeID
		)
};

let getDiagramIDFromMethod = async (methodID) => {
	return await knex
		.select(dbshema.contentNames.class.classDiagramID)
		.from(dbshema.tableNames.class)
		.innerJoin(
			dbshema.tableNames.method,
			dbshema.tableNames.class + '.' + dbshema.contentNames.class.id,
			'=',
			dbshema.tableNames.method + '.' + dbshema.contentNames.method.classID
		)
		.where(
			dbshema.tableNames.method + '.' + dbshema.contentNames.method.id,
			'=',
			methodID
		)
};

let getDiagramIDFromMethodParameter = async (methodParameterID) => {
	return await knex
		.select(dbshema.contentNames.class.classDiagramID)
		.from(dbshema.tableNames.class)
		.innerJoin(
			dbshema.tableNames.method,
			dbshema.tableNames.class + '.' + dbshema.contentNames.class.id,
			'=',
			dbshema.tableNames.method + '.' + dbshema.contentNames.method.classID
		)
		.innerJoin(
			dbshema.tableNames.methodParam,
			dbshema.tableNames.method + '.' + dbshema.contentNames.method.id,
			'=',
			dbshema.tableNames.methodParam + '.' + dbshema.contentNames.methodParam.methodID
		)
		.where(
			dbshema.tableNames.methodParam + '.' + dbshema.contentNames.methodParam.id,
			'=',
			methodParameterID
		)
};

let getDiagramIDFromAssociation = async (associationID) => {
	return await knex
		.select(dbshema.contentNames.association.classDiagramID)
		.from(dbshema.tableNames.association)
		.where(dbshema.contentNames.association.id, '=', associationID)
};

let getDiagramIDFromAssociationEnd = async (associationEndID) => {
	return await knex
		.select(dbshema.contentNames.associationEnd.classDiagramID)
		.from(dbshema.tableNames.associationEnd)
		.where(dbshema.contentNames.associationEnd.id, '=', associationEndID)
};

let getDiagramIDFromDependency = async (dependencyID) => {
	return await knex
		.select(dbshema.contentNames.dependency.classDiagramID)
		.from(dbshema.tableNames.dependency)
		.where(dbshema.contentNames.dependency.id, '=', dependencyID)
};

let getDiagramIDFromRealization = async (realizationID) => {
	return await knex
		.select(dbshema.contentNames.realization.classDiagramID)
		.from(dbshema.tableNames.realization)
		.where(dbshema.contentNames.realization.id, '=', realizationID)
};

let getDiagramIDFromGeneralization = async (generalizationID) => {
	return await knex
		.select(dbshema.contentNames.generalization.classDiagramID)
		.from(dbshema.tableNames.generalization)
		.where(dbshema.contentNames.generalization.id, '=', generalizationID)
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