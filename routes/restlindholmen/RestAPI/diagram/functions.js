/*
 * Developed by Steven BUCAILLE on 11/26/18 6:58 PM.
 * Last modified 11/19/18 9:27 PM.
 * Copyright (c) 2018. All right reserved.
 *
 */

let knex = require('../../mysql/mysqlconnection').knex;
let dbSchema = require('../../../../dbschema').db;
let dbTableNames = dbSchema.tableNames;
let dbTableContent = dbSchema.tableContent;
let resultManipulation = require('../../mysql/resultManipulation');
let classFunctions = require('../class/functions');
let tagFunctions = require('../tag/functions');

let getAllDiagramsID = async () => {
    return resultManipulation.getArrayFromResult(
        await knex
            .select('id')
            .from(dbTableNames.diagram)
    )
};

let addClassesOfTheDiagram = async (diagramID, classes) => {
    let classesID = await classFunctions.getClassesFromDiagram([diagramID]);
    for (let i = 0; i < classesID[diagramID].length; i++) {
        classes.push(await classFunctions.getClassInfo([classesID[diagramID][i].id]));
    }
};

let getTheDiagramNameFromFilePath = (filePath) => {
    let names = filePath.split("\\");
    return names[names.length - 1];
};

/**
 * EntityInfo typed query.
 * @param diagramID
 * @returns {Promise<{diagrams: Array}>}
 */
let getDiagramInfo = async (diagramID) => {
    let diagramsInfo = await knex
        .select()
        .from(dbTableNames.diagram)
        .whereIn(
            dbTableContent.diagram.id,
            diagramID
        );

    let result = [];
    for (let i = 0; i < diagramsInfo.length; i++) {
        let diagramInfo = diagramsInfo[i];
        let diagramId = diagramInfo[dbTableContent.diagram.id];
        let diagramFilePath = diagramInfo[dbTableContent.diagram.filePath];
        let diagramName = getTheDiagramNameFromFilePath(diagramFilePath);
        let classes = [];
        result.push({
            id: diagramId,
            filePath: diagramFilePath,
            name: diagramName,
            classesID: classes,
        });
        await addClassesOfTheDiagram(diagramId, classes);
    }
    return {
        diagrams: result
    }
};

let getTagFromDiagram = async (diagramID) => {
    return await tagFunctions.getTagFromEntity("diagram", diagramID);
};

let getDiagramIDFromClass = async (classID) => {
    return await knex
        .select(
            dbTableContent.class.id + ' as parameter',
            dbTableContent.class.diagramID
        )
        .from(dbTableNames.class)
        .whereIn(dbTableContent.class.id, classID)
};

let getDiagramIDFromAttribute = async (attributeID) => {
    return await knex
        .select(
            dbTableNames.attribute + '.' + dbTableContent.attribute.id + ' as parameter',
            dbTableContent.class.diagramID
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
            dbTableContent.class.diagramID
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
            dbTableContent.class.diagramID
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
            dbTableContent.association.diagramID
        )
        .from(dbTableNames.association)
        .whereIn(dbTableContent.association.id, associationID)
};

let getDiagramIDFromAssociationEnd = async (associationEndID) => {
    return await knex
        .select(
            dbTableContent.associationEnd.id + ' as parameter',
            dbTableContent.associationEnd.diagramID
        )
        .from(dbTableNames.associationEnd)
        .whereIn(dbTableContent.associationEnd.id, associationEndID)
};

let getDiagramIDFromDependency = async (dependencyID) => {
    return await knex
        .select(
            dbTableContent.dependency.id + ' as parameter',
            dbTableContent.dependency.diagramID
        )
        .from(dbTableNames.dependency)
        .whereIn(dbTableContent.dependency.id, dependencyID)
};

let getDiagramIDFromRealization = async (realizationID) => {
    return await knex
        .select(
            dbTableContent.realization.id + ' as parameter',
            dbTableContent.realization.diagramID
        )
        .from(dbTableNames.realization)
        .whereIn(dbTableContent.realization.id, realizationID)
};

let getDiagramIDFromGeneralization = async (generalizationID) => {
    return await knex
        .select(
            dbTableContent.generalization.id + ' as parameter',
            dbTableContent.generalization.diagramID
        )
        .from(dbTableNames.generalization)
        .whereIn(dbTableContent.generalization.id, generalizationID)
};

module.exports = {
    getAllDiagramsID: getAllDiagramsID,
    getDiagramInfo: getDiagramInfo,
    getTagFromDiagram: getTagFromDiagram,
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