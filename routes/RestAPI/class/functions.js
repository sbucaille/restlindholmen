/*
 * Developed by Steven BUCAILLE on 11/26/18 6:58 PM.
 * Last modified 11/24/18 9:07 PM.
 * Copyright (c) 2018. All right reserved.
 *
 */

let knex = require('../../mysql/mysqlconnection').knex;
let dbSchema = require('../../../dbschema').db;
let dbTableNames = dbSchema.tableNames;
let dbTableContent = dbSchema.tableContent;
let resultManipulation = require('../../mysql/resultManipulation');

let getAllClassesID = async () => {
	return resultManipulation.getArrayFromResult(
		await knex
			.select(dbTableContent.class.id)
			.from(dbTableNames.class)
	)
};

let getClassesFromDiagram = async (diagramID) => {
	return resultManipulation.getArrayFromResult(
		await knex
			.select(dbTableContent.class.id)
			.from(dbTableNames.class)
			.where(
				dbTableContent.class.classDiagramID,
				'=',
				diagramID
			)
	)
};

let getClassIDFromAttribute = async (attributeID) => {
	return await knex
		.select(dbTableContent.attribute.classID)
		.from(dbTableNames.attribute)
		.where(
			dbTableContent.attribute.id,
			'=',
			attributeID
		)
};

let getClassIDFromMethod = async (methodID) => {
	return await knex
		.select(dbTableContent.method.classID)
		.from(dbTableNames.method)
		.where(
			dbTableContent.method.id,
			'=',
			methodID
		)
};

let getClassIDFromMethodParam = async (methodParamID) => {
	return await knex
		.select(dbTableContent.method.classID)
		.from(dbTableNames.method)
		.innerJoin(
			dbTableNames.methodParam,
			dbTableNames.method + '.' + dbTableContent.method.id,
			'=',
			dbTableNames.methodParam + '.' + dbTableContent.methodParam.methodID
		)
		.where(
			dbTableNames.methodParam + '.' + dbTableContent.methodParam.id,
			'=',
			methodParamID
		)
};

let getClassesIDFromAssociation = async (associationID) => {
	return resultManipulation.getArrayFromResult(
		await knex
			.select(dbTableContent.associationEnd.classID)
			.from(dbTableNames.associationEnd)
			.innerJoin(
				dbTableNames.association,
				dbTableNames.associationEnd + '.' + dbTableContent.associationEnd.associationID,
				'=',
				dbTableNames.association + '.' + dbTableContent.association.id
			)
			.where(
				dbTableNames.association + '.' + dbTableContent.association.id,
				'=',
				associationID
			)
			.debug()
	)
};

let getClassIDFromAssociationEnd = async (associationEndID) => {
	return await knex
		.select(dbTableContent.associationEnd.classID)
		.from(dbTableNames.associationEnd)
		.where(
			dbTableContent.associationEnd.id,
			'=',
			associationEndID
		)
};

let getClassesIDFromDependency = async (dependencyID) => {
	return await knex
		.select(dbTableContent.dependency.supplierClassID, dbTableContent.dependency.clientClassID)
		.from(dbTableNames.dependency)
		.where(
			dbTableContent.dependency.id,
			'=',
			dependencyID
		)
};

let getSupplierClassIDFromDependency = async (dependencyID) => {
	return await knex
		.select(dbTableContent.dependency.supplierClassID)
		.from(dbTableNames.dependency)
		.where(
			dbTableContent.dependency.id,
			'=',
			dependencyID
		)
};

let getClientClassIDFromDependency = async (dependencyID) => {
	return await knex
		.select(dbTableContent.dependency.clientClassID)
		.from(dbTableNames.dependency)
		.where(
			dbTableContent.dependency.id,
			'=',
			dependencyID
		)
};

let getClassesIDFromRealization = async (realizationID) => {
	return await knex
		.select(dbTableContent.realization.supplierClassID, dbTableContent.realization.clientClassID)
		.from(dbTableNames.realization)
		.where(
			dbTableContent.realization.id,
			'=',
			realizationID
		)
};

let getSupplierClassIDFromRealization = async (realization) => {
	return await knex
		.select(dbTableContent.realization.supplierClassID)
		.from(dbTableNames.realization)
		.where(
			dbTableContent.realization.id,
			'=',
			realization
		)
};

let getClientClassIDFromRealization = async (realizationID) => {
	return await knex
		.select(dbTableContent.realization.clientClassID)
		.from(dbTableNames.realization)
		.where(
			dbTableContent.realization.id,
			'=',
			realizationID
		)
};

let getClassesIDFromGeneralization = async (generalizationID) => {
	return await knex
		.select(dbTableContent.generalization.childClassID, dbTableContent.generalization.parentClassID)
		.from(dbTableNames.generalization)
		.where(
			dbTableContent.generalization.id,
			'=',
			generalizationID
		)
};

let getChildClassIDFromGeneralization = async (generalizationID) => {
	return await knex
		.select(dbTableContent.generalization.childClassID)
		.from(dbTableNames.generalization)
		.where(
			dbTableContent.generalization.id,
			'=',
			generalizationID
		)
};

let getParentClassIDFromGeneralization = async (generalizationID) => {
	return await knex
		.select(dbTableContent.generalization.parentClassID)
		.from(dbTableNames.generalization)
		.where(
			dbTableContent.generalization.id,
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