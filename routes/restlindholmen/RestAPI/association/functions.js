/*
 * Developed by Steven BUCAILLE on 12/30/18 9:58 PM.
 * Last modified 12/30/18 9:58 PM .
 * Copyright (c) 2018. All right reserved.
 *
 */

let knex = require('../../mysql/mysqlconnection').knex;
let dbSchema = require('../../../../dbschema').db;
let dbTableNames = dbSchema.tableNames;
let dbTableContent = dbSchema.tableContent;
let resultManipulation = require('../../mysql/resultManipulation');
let tagFunctions = require('../tag/functions');

/**
 * Array typed query.
 * @returns {Promise<Array>}
 */
let getAllAssociationsID = async () => {
    return resultManipulation.getArrayFromResult(
        await knex
            .select(dbTableContent.association.id)
            .from(dbTableNames.association)
    )
};

let addAssociationEndsOfTheAssociation = (assocID, associationEnds) => {
    //TODO
}

/**
 * EntityInfo typed query.
 * @param associationID
 * @returns {Promise<void>}
 */
let getAssociationInfo = async (associationID) => {
    //TODO
    let assocsInfo = await knex
        .select()
        .from(dbTableNames.association)
        .whereIn(
            dbTableContent.association.id,
            associationID
        );

    let result = [];
    for (let i = 0; i < assocsInfo.length; i++) {
        let assocInfo = assocsInfo[i];
        let assocID = assocInfo[dbTableContent.association.id];
        let associationEnds = {};
        result.push({
            id: assocID,
            diagramID: assocInfo[dbTableContent.association.diagramID],
            visibility: assocInfo[dbTableContent.association.visibility],
            xmiID: assocInfo[dbTableContent.association.xmiID],
            associationEnds: associationEnds
        })

        await addAssociationEndsOfTheAssociation(assocID, associationEnds);
    }
};

let getTagFromAssociation = async (associationID) => {
    return await tagFunctions.getTagFromEntity("association", associationID)
};

/**
 * ParameterLinked typed query.
 * @param diagramID
 * @returns {Promise<{}>}
 */
let getAssociationsFromDiagram = async (diagramID) => {
    return resultManipulation.getResultWithLinkedParameter(
        await knex
            .select(
                dbTableContent.association.diagramID + ' as parameter',
                dbTableContent.association.id
            )
            .from(dbTableNames.association)
            .whereIn(
                dbTableContent.association.diagramID,
                diagramID
            )
    )
};

module.exports = {
    getAllAssociationsID: getAllAssociationsID,
    getAssociationInfo: getAssociationInfo,
    getTagFromAssociation: getTagFromAssociation,
    getAssociationsFromDiagram: getAssociationsFromDiagram
}