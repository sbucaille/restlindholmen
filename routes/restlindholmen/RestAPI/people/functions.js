/*
 * Developed by Steven BUCAILLE on 1/3/19 8:41 PM.
 * Last modified 1/3/19 8:41 PM .
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
let getAllPeopleID = async () => {
    return resultManipulation.getArrayFromResult(
        await knex
            .select(dbTableContent.people.id)
            .from(dbTableNames.people)
    )
};

/**
 * EntityInfo typed query.
 * @param peopleID
 * @returns {Promise<void>}
 */
let getPeopleInfo = async (peopleID) => {
    return await knex
        .select()
        .from(dbTableNames.people)
        .whereIn(
            dbTableContent.people.id,
            peopleID
        )
};

/**
 * ParameterLinked typed query.
 * @param commitID
 * @returns {Promise<{}>}
 */
let getPeopleFromCommit = async (commitID) => {
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
    getAllPeopleID : getAllPeopleID,
    getPeopleInfo : getPeopleInfo,
    getPeopleFromCommit : getPeopleFromCommit
};