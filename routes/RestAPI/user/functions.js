/*
 * Developed by Steven BUCAILLE on 1/3/19 8:54 PM.
 * Last modified 1/3/19 8:54 PM .
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
let getAllUsersID = async () => {
    return resultManipulation.getArrayFromResult(
        await knex
            .select(dbTableContent.user.id)
            .from(dbTableNames.user)
    )
};

/**
 * EntityInfo typed query.
 * @param userID
 * @returns {Promise<void>}
 */
let getUserInfo = async (userID) => {
    return await knex
        .select()
        .from(dbTableNames.user)
        .whereIn(
            dbTableContent.user.id,
            userID
        )
};

/**
 * ParameterLinked typed query.
 * @param founderName
 * @returns {Promise<{}>}
 */
let getFounderOfRepository = async (founderName) => {
    return resultManipulation.getResultWithLinkedParameter(
        await knex
            .select(
                dbTableNames.repository + '.' + dbTableContent.repository.founder + ' as parameter',
                dbTableNames.user + '.' + dbTableContent.user.id
            )
            .from(dbTableNames.user)
            .innerJoin(
                dbTableNames.repository,
                dbTableNames.repository + '.' + dbTableContent.repository.founder,
                '=',
                dbTableNames.user + '.' + dbTableContent.user.login
            )
            .whereIn(
                dbTableNames.repository + '.' + dbTableContent.repository.founder,
                founderName
            )
    )
};

/**
 * ParameterLinked typed query.
 * @param commitID
 * @returns {Promise<{}>}
 */
let getUserFromCommit = async (commitID) => {
    return resultManipulation.getResultWithLinkedParameter(
        await knex
            .select(
                dbTableContent.commit.id + ' as parameter',
                dbTableContent.commit.peopleID
            )
            .from(dbTableNames.commit)
            .whereIn(
                dbTableContent.commit.id,
                commitID
            )
    )
};


module.exports = {
    getAllUsersID : getAllUsersID,
    getUserInfo : getUserInfo,
    getFounderOfRepository : getFounderOfRepository,
    getUserFromCommit : getUserFromCommit
};