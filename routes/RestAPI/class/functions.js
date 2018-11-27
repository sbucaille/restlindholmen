/*
 * Developed by Steven BUCAILLE on 11/26/18 6:58 PM.
 * Last modified 11/24/18 9:07 PM.
 * Copyright (c) 2018. All right reserved.
 *
 */

let knex = require('../../mysql/mysqlconnection').knex;
let dbshema = require('../../../dbschema').db;
let resultManipulation = require('../../mysql/resultManipulation');

let getAllClassesID = async () => {
	return resultManipulation.getArrayFromResult(
		await knex
			.select(dbshema.contentNames.class.id)
			.from(dbshema.tableNames.class)
	)
};

let getClassesFromDiagram = async (diagramID) => {
	return resultManipulation.getArrayFromResult(
		await knex
			.select(dbshema.contentNames.class.id)
			.from(dbshema.tableNames.class)
			.where(
				dbshema.contentNames.class.classDiagramID,
				'=',
				diagramID
			)
	)
};

let getClassIDFromAttribute = async (attributeID) => {
	return await knex
		.select(dbshema.contentNames.attribute.classID)
		.from(dbshema.tableNames.attribute)
		.where(
			dbshema.contentNames.attribute.id,
			'=',
			attributeID
		)
};

let getClassIDFromMethod = async (methodID) => {
	return await knex
		.select(dbshema.contentNames.method.classID)
		.from(dbshema.tableNames.method)
		.where(
			dbshema.contentNames.method.id,
			'=',
			methodID
		)
};

let getClassIDFromMethodParam = async (methodParamID) => {
	return await knex
		.select(dbshema.contentNames.method.classID)
		.from(dbshema.tableNames.method)
		.innerJoin(
			dbshema.tableNames.methodParam,
			dbshema.tableNames.method + '.' + dbshema.contentNames.method.id,
			'=',
			dbshema.tableNames.methodParam + '.' + dbshema.contentNames.methodParam.methodID
		)
		.where(
			dbshema.tableNames.methodParam + '.' + dbshema.contentNames.methodParam.id,
			'=',
			methodParamID
		)
};

let getClassesIDFromAssociation = async (associationID) => {
	return resultManipulation.getArrayFromResult(
		await knex
			.select(dbshema.contentNames.associationEnd.classID)
			.from(dbshema.tableNames.associationEnd)
			.innerJoin(
				dbshema.tableNames.association,
				dbshema.tableNames.associationEnd + '.' + dbshema.contentNames.associationEnd.associationID,
				'=',
				dbshema.tableNames.association + '.' + dbshema.contentNames.association.id
			)
			.where(
				dbshema.tableNames.association + '.' + dbshema.contentNames.association.id,
				'=',
				associationID
			)
			.debug()
	)
};

let getClassIDFromAssociationEnd = async (associationEndID) => {
	return await knex
		.select(dbshema.contentNames.associationEnd.classID)
		.from(dbshema.tableNames.associationEnd)
		.where(
			dbshema.contentNames.associationEnd.id,
			'=',
			associationEndID
		)
};

let getClassesIDFromDependency = async (dependencyID) => {
	return await knex
		.select(dbshema.contentNames.dependency.supplierClassID, dbshema.contentNames.dependency.clientClassID)
		.from(dbshema.tableNames.dependency)
		.where(
			dbshema.contentNames.dependency.id,
			'=',
			dependencyID
		)
};

let getSupplierClassIDFromDependency = async (dependencyID) => {
	return await knex
		.select(dbshema.contentNames.dependency.supplierClassID)
		.from(dbshema.tableNames.dependency)
		.where(
			dbshema.contentNames.dependency.id,
			'=',
			dependencyID
		)
};

let getClientClassIDFromDependency = async (dependencyID) => {
	return await knex
		.select(dbshema.contentNames.dependency.clientClassID)
		.from(dbshema.tableNames.dependency)
		.where(
			dbshema.contentNames.dependency.id,
			'=',
			dependencyID
		)
};

let getClassesIDFromRealization = async (realizationID) => {
	return await knex
		.select(dbshema.contentNames.realization.supplierClassID, dbshema.contentNames.realization.clientClassID)
		.from(dbshema.tableNames.realization)
		.where(
			dbshema.contentNames.realization.id,
			'=',
			realizationID
		)
};

let getSupplierClassIDFromRealization = async (realization) => {
	return await knex
		.select(dbshema.contentNames.realization.supplierClassID)
		.from(dbshema.tableNames.realization)
		.where(
			dbshema.contentNames.realization.id,
			'=',
			realization
		)
};

let getClientClassIDFromRealization = async (realizationID) => {
	return await knex
		.select(dbshema.contentNames.realization.clientClassID)
		.from(dbshema.tableNames.realization)
		.where(
			dbshema.contentNames.realization.id,
			'=',
			realizationID
		)
};

let getClassesIDFromGeneralization = async (generalizationID) => {
	return await knex
		.select(dbshema.contentNames.generalization.childClassID, dbshema.contentNames.generalization.parentClassID)
		.from(dbshema.tableNames.generalization)
		.where(
			dbshema.contentNames.generalization.id,
			'=',
			generalizationID
		)
};

let getChildClassIDFromGeneralization = async (generalizationID) => {
	return await knex
		.select(dbshema.contentNames.generalization.childClassID)
		.from(dbshema.tableNames.generalization)
		.where(
			dbshema.contentNames.generalization.id,
			'=',
			generalizationID
		)
};

let getParentClassIDFromGeneralization = async (generalizationID) => {
	return await knex
		.select(dbshema.contentNames.generalization.parentClassID)
		.from(dbshema.tableNames.generalization)
		.where(
			dbshema.contentNames.generalization.id,
			'=',
			generalizationID
		)
};

module.exports = {
	getAllClassesID: getAllClassesID,
	getClassesFromDiagram: getClassesFromDiagram,
	getClassIDFromAttribute: getClassIDFromAttribute,
	getClassIDFromMethod: getClassIDFromMethod,
	getClassIDFromMethodParam: getClassIDFromMethodParam,
	getClassesIDFromAssociation: getClassesIDFromAssociation,
	getClassIDFromAssociationEnd: getClassIDFromAssociationEnd,
	getClassesIDFromDependency: getClassesIDFromDependency,
	getSupplierClassIDFromDependency: getSupplierClassIDFromDependency,
	getClientClassIDFromDependency: getClientClassIDFromDependency,
	getClassesIDFromRealization: getClassesIDFromRealization,
	getSupplierClassIDFromRealization: getSupplierClassIDFromRealization,
	getClientClassIDFromRealization: getClientClassIDFromRealization,
	getClassesIDFromGeneralization: getClassesIDFromGeneralization,
	getChildClassIDFromGeneralization: getChildClassIDFromGeneralization,
	getParentClassIDFromGeneralization: getParentClassIDFromGeneralization
};