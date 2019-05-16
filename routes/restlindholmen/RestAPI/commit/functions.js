/*
 * Developed by Steven BUCAILLE on 1/3/19 5:38 PM.
 * Last modified 1/3/19 5:38 PM .
 * Copyright (c) 2019. All right reserved.
 *
 */


let knex = require('../../mysql/mysqlconnection').knex;
let dbSchema = require('../../../../dbschema').db;
let dbTableNames = dbSchema.tableNames;
let dbTableContent = dbSchema.tableContent;
let resultManipulation = require('../../mysql/resultManipulation');

/**
 * Array typed query.
 * @returns {Promise<Array>}
 */
let getAllCommitsID = async () => {
    return resultManipulation.getArrayFromResult(
        await knex
            .select(dbTableContent.commit.id)
            .from(dbTableNames.commit)
    )
};

/**
 * EntityInfo typed query.
 * @param commitID
 * @returns {Promise<void>}
 */
let getCommitInfo = async (commitID) => {
    return await knex
        .select()
        .from(dbTableNames.commit)
        .whereIn(
            dbTableContent.commit.id,
            commitID
        )
};

/**
 * ParameterLinked typed query.
 * @param diagramID
 * @returns {Promise<{}>}
 */
let getCommitFromUmlFile = async (umlFileID) => {
    return resultManipulation.getResultWithLinkedParameter(
        await knex
            .select(
                dbTableContent.umlfile.id + ' as parameter',
                dbTableContent.umlfile.commitID
            )
            .from(dbTableNames.umlfile)
            .whereIn(
                dbTableContent.umlfile.id,
                umlFileID
            )
    )
}

/**
 * ParameterLinked typed query.
 * @param diagramID
 * @returns {Promise<{}>}
 */
let getCommitFromDiagram = async (diagramID) => {
    return resultManipulation.getResultWithLinkedParameter(
        await knex
            .select(
                dbTableNames.diagram + '.' + dbTableContent.diagram.id + ' as parameter',
                dbTableContent.umlfile.commitID
            )
            .from(dbTableNames.umlfile)
            .innerJoin(
                dbTableNames.diagram,
                dbTableNames.umlfile + '.' + dbTableContent.umlfile.diagramID,
                '=',
                dbTableNames.diagram + '.' + dbTableContent.diagram.id
            )
            .whereIn(
                dbTableContent.umlfile.diagramID,
                diagramID
            )
    )
};

/**
 * ParameterLinked typed query.
 * @param repositoryID
 * @returns {Promise<{}>}
 */
let getCommitFromRepository = async (repositoryID) => {
    return resultManipulation.getResultWithLinkedParameter(
        await knex
            .select(
                dbTableContent.commit.repositoryID + ' as parameter',
                dbTableContent.commit.id
            )
            .from(dbTableNames.commit)
            .whereIn(
                dbTableContent.commit.repositoryID,
                repositoryID
            )
    )
};

/**
 * ParameterLinked typed query.
 * @param peopleID
 * @returns {Promise<{}>}
 */
let getCommitFromPeople = async (peopleID) => {
    return resultManipulation.getResultWithLinkedParameter(
        await knex
            .select(
                dbTableContent.commit.peopleID + ' as parameter',
                dbTableContent.commit.id
            )
            .from(dbTableNames.commit)
            .whereIn(
                dbTableContent.commit.peopleID,
                peopleID
            )
    )
};

/**
 * ParameterLinked typed query.
 * @param fileCommitID
 * @returns {Promise<{}>}
 */
let getCommitFromFileCommit = async (fileCommitID) => {
    return resultManipulation.getResultWithLinkedParameter(
        await knex
            .select(
                dbTableContent.filecommit.id + ' as parameter',
                dbTableContent.commit.id
            )
            .from(dbTableNames.filecommit)
            .whereIn(
                dbTableContent.filecommit.id,
                fileCommitID
            )
    )
};

module.exports = {
    getAllCommitsID : getAllCommitsID,
    getCommitInfo : getCommitInfo,
    getCommitFromUmlFile : getCommitFromUmlFile,
    getCommitFromDiagram : getCommitFromDiagram,
    getCommitFromRepository : getCommitFromRepository,
    getCommitFromPeople : getCommitFromPeople,
    getCommitFromFileCommit : getCommitFromFileCommit,

};