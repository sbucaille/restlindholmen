/*
 * Developed by Steven BUCAILLE on 1/3/19 8:29 PM.
 * Last modified 1/3/19 8:29 PM .
 * Copyright (c) 2019. All right reserved.
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
let getAllFileCommitsID = async () => {
    return resultManipulation.getArrayFromResult(
        await knex
            .select(dbTableContent.filecommit.id)
            .from(dbTableNames.filecommit)
    )
};

/**
 * EntityInfo typed query.
 * @param fileCommitID
 * @returns {Promise<void>}
 */
let getFileCommitInfo = async (fileCommitID) => {
    return await knex
        .select()
        .from(dbTableNames.filecommit)
        .whereIn(
            dbTableContent.filecommit.id,
            fileCommitID
        )
};

/**
 * ParameterLinked typed query.
 * @param commitID
 * @returns {Promise<{}>}
 */
let getFileCommitFromCommit = async (commitID) => {
    return resultManipulation.getResultWithLinkedParameter(
        await knex
            .select(
                dbTableContent.filecommit.commitID + ' as parameter',
                dbTableContent.filecommit.id
            )
            .from(dbTableNames.filecommit)
            .whereIn(
                dbTableContent.filecommit.commitID,
                commitID
            )
    )
};

/**
 * ParameterLinked typed query.
 * @param repositoryID
 * @returns {Promise<{}>}
 */
let getFileCommitFromRepository = async (repositoryID) => {
    return resultManipulation.getResultWithLinkedParameter(
        await knex
            .select(
                dbTableContent.filecommit.repositoryID + ' as parameter',
                dbTableContent.filecommit.id
            )
            .from(dbTableNames.repository)
            .whereIn(
                dbTableContent.filecommit.repositoryID,
                repositoryID
            )
    )
};


module.exports = {
    getAllFileCommitsID : getAllFileCommitsID,
    getFileCommitInfo : getFileCommitInfo,
    getFileCommitFromCommit : getFileCommitFromCommit,
    getFileCommitFromRepository : getFileCommitFromRepository
};