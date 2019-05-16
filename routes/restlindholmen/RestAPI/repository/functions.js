/*
 * Developed by Steven BUCAILLE on 1/3/19 6:00 PM.
 * Last modified 1/3/19 6:00 PM .
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
let getAllRepositoriesID = async () => {
    return resultManipulation.getArrayFromResult(
        await knex
            .select(dbTableContent.repository.id)
            .from(dbTableNames.repository)
    )
};

/**
 * EntityInfo typed query.
 * @param repositoryID
 * @returns {Promise<void>}
 */
let getRepositoryInfo = async (repositoryID) => {
    return await knex
        .select()
        .from(dbTableNames.repository)
        .whereIn(
            dbTableContent.repository.id,
            repositoryID
        )
};

/**
 * ParameterLinked typed query.
 * @param commitID
 * @returns {Promise<{}>}
 */
let getRepositoryFromCommit = async (commitID) => {
    return resultManipulation.getResultWithLinkedParameter(
        await knex
            .select(
                dbTableNames.commit + '.' + dbTableContent.commit.id + ' as parameter',
                dbTableNames.repository + '.' + dbTableContent.repository.id
            )
            .from(dbTableNames.repository)
            .innerJoin(
                dbTableNames.commit,
                dbTableNames.repository + '.' + dbTableContent.repository.id,
                '=',
                dbTableNames.commit + '.' + dbTableContent.commit.repositoryID
            )
            .whereIn(
                dbTableNames.commit + '.' + dbTableContent.commit.id,
                commitID
            )
    )
};

/**
 * ParameterLinked typed query.
 * @param founderName
 * @returns {Promise<{}>}
 */
let getRepositoryFromFounder = async (founderName) => {
    return resultManipulation.getResultWithLinkedParameter(
        await knex
            .select(
                dbTableContent.repository.founder + ' as parameter',
                dbTableContent.repository.id
            )
            .from(dbTableNames.repository)
            .whereIn(
                dbTableContent.repository.founder,
                founderName
            )
    )
};

/**
 * ParameterLinked typed query.
 * @param fileCommitID
 * @returns {Promise<{}>}
 */
let getRepositoryFromFileCommit = async (fileCommitID) => {
    return resultManipulation.getResultWithLinkedParameter(
        await knex
            .select(
                dbTableNames.filecommit + '.' + dbTableContent.filecommit.id + ' as parameter',
                dbTableNames.repository + '.' + dbTableContent.repository.id
            )
            .from(dbTableNames.repository)
            .innerJoin(
                dbTableNames.filecommit,
                dbTableNames.repository + '.' + dbTableContent.repository.id,
                '=',
                dbTableNames.filecommit + '.' + dbTableContent.filecommit.repositoryID
            )
            .whereIn(
                dbTableNames.filecommit + '.' + dbTableContent.filecommit.id,
                fileCommitID
            )
    )
};

/**
 * ParameterLinked typed query.
 * @param umlFileID
 * @returns {Promise<{}>}
 */
let getRepositoryFromUmlFile = async (umlFileID) => {
    return resultManipulation.getResultWithLinkedParameter(
        await knex
            .select(
                dbTableNames.umlfile + '.' + dbTableContent.umlfile.id + ' as parameter',
                dbTableNames.repository + '.' + dbTableContent.repository.id
            )
            .from(dbTableNames.repository)
            .innerJoin(
                dbTableNames.umlfile,
                dbTableNames.repository + '.' + dbTableContent.repository.id,
                '=',
                dbTableNames.umlfile + '.' + dbTableContent.umlfile.repositoryID
            )
            .whereIn(
                dbTableNames.umlfile + '.' + dbTableContent.umlfile.id,
                umlFileID
            )
    )
};

module.exports = {
    getAllRepositoriesID: getAllRepositoriesID,
    getRepositoryInfo: getRepositoryInfo,
    getRepositoryFromCommit: getRepositoryFromCommit,
    getRepositoryFromFounder: getRepositoryFromFounder,
    getRepositoryFromFileCommit: getRepositoryFromFileCommit,
    getRepositoryFromUmlFile: getRepositoryFromUmlFile
};