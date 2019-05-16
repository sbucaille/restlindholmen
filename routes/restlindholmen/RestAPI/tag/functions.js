/*
 * Developed by Steven BUCAILLE on 2/27/19 10:04 PM.
 * Last modified 2/27/19 10:04 PM .
 * Copyright (c) 2019. All right reserved.
 *
 */

let dbschema = require('../../mysql/mysqlconnection').dbschema;
let knex = require('../../mysql/mysqlconnection').knex;

let getTagInfoFromEntityID = async (entityType, entityID) => {
    let tagInfo = knex.select()
        .from(dbschema.tableNames.tag)
        .join(
            dbschema.tableNames.has_tag,
            dbschema.tableNames.tag + '.' + dbschema.tableContent.tag.id,
            dbschema.tableNames.has_tag + '.' + dbschema.tableContent.has_tag.tagID
        )
        .whereIn(
            dbschema.tableContent.has_tag.entityID,
            entityID
        )
        .andWhere(
            dbschema.tableContent.has_tag.entityType,
            entityType
        );
    return await tagInfo;
};

let getEntityTag = async (entityType, entityID) => {
    let tagInfo = await getTagInfoFromEntityID(entityType, entityID);
    let result = [];
    for (let i = 0; i < entityID.length; i++) {
        let entityResult = {};
        entityResult[`${entityType}ID`] = entityID[i];
        entityResult.tags = [];
        result.push(entityResult);
    }
    for (let i = 0; i < tagInfo.length; i++) {
        let tagEntityID = tagInfo[i][dbschema.tableContent.has_tag.entityID];
        let entityIndex = entityID.indexOf(tagEntityID);
        let tagID = tagInfo[i][dbschema.tableContent.has_tag.tagID];
        let tagName = tagInfo[i][dbschema.tableContent.tag.name];
        let tagValue = tagInfo[i][dbschema.tableContent.tag.value];
        result[entityIndex].tags.push({
            tagID: tagID,
            tagName: tagName,
            tagValue: tagValue
        })
    }
    return result;
};

let getTagInfoFromTagID = async (tagID) => {
    let tagInfo = knex.select()
        .from(dbschema.tableNames.tag)
        .join(
            dbschema.tableNames.has_tag,
            dbschema.tableNames.tag + '.' + dbschema.tableContent.tag.id,
            dbschema.tableNames.has_tag + '.' + dbschema.tableContent.has_tag.tagID
        )
        .whereIn(
            dbschema.tableNames.tag + '.' + dbschema.tableContent.tag.id,
            tagID
        )
    // console.log(tagInfo.toString());
    return await tagInfo;
};

let getEntityInfoFromTag = async (tagInfo) => {
    function filterUniqueEntityUsed(tagInfoElement) {
        tagInfoElement.entityUsed.filter((v, i, a) => a.indexOf(v) === i)
    }

    for (let i = 0; i < tagInfo.length; i++) {
        filterUniqueEntityUsed(tagInfo[i]);
        let tagInfoKeys = Object.keys(tagInfo[i]);
        let entities = [];
        for (let j = 0; j < tagInfoKeys; j++) {
            let tagInfoElement = tagInfo[i][tagInfoKeys[j]];
            if (Array.isArray(tagInfoElement)) {
                for (let k = 0; k < tagInfoElement.length; k++) {

                }
            }
        }
    }
};

let getTagInfo = async (tagID) => {
    let tagInfo = await getTagInfoFromTagID(tagID);
    let result = {};
    for (let i = 0; i < tagInfo.length; i++) {
        let currentTagID = tagInfo[i][dbschema.tableContent.has_tag.tagID];
        if (!result[currentTagID]) result[currentTagID] = {};
        let tagName = tagInfo[i][dbschema.tableContent.tag.name];
        let tagValue = tagInfo[i][dbschema.tableContent.tag.value];
        let entityType = tagInfo[i][dbschema.tableContent.has_tag.entityType];
        let entityID = tagInfo[i][dbschema.tableContent.has_tag.entityID];
        result[currentTagID].name = tagName;
        result[currentTagID].value = tagValue;
        if (!result[currentTagID][entityType]) result[currentTagID][entityType] = [];
        if (!result[currentTagID].usedEntities) result[currentTagID].usedEntities = [];
        result[currentTagID].usedEntities.push(entityType);
        result[currentTagID][entityType].push({id: entityID});
    }
    await getEntityInfoFromTag(result);
    return result;
};


let createNewTag = async (params) => {
    //TODO Ajouter une vérification des données sur les entities (existance de cet entity, existance du type d'entity,...)
    let name = params.name;
    let value = params.value;
    let entityType = params.entityType;
    let entityID = params.entityID;
    if (value && name) {
        let row = {};
        row[dbschema.tableContent.tag.name] = name;
        row[dbschema.tableContent.tag.value] = value;
        let res = await knex(dbschema.tableNames.tag)
            .insert(row);
        if (entityType && entityID) {
            await assignTag({
                entityType: entityType,
                entityID: entityID,
                tagID: res[0]
            });
        }
    } else throw "Parameters are wrong"
};

let createNewTagRouter = async (req, res) => {
    try {
        await createNewTag(req.body);
        res.sendStatus(200)
    } catch (e) {
        console.error(e);
        console.log(e.stackTrace);
        res.sendStatus(400);
    }
};

let modifyTag = async (params) => {
    let tagID = params.tagID;

    let name = params.name;
    let value = params.value;
    if ((tagID && name) || (tagID && value)) {
        let updateQuery = knex(dbschema.tableNames.tag)
            .where(dbschema.tableContent.tag.id, tagID);
        if (name) updateQuery.update({name: name});
        if (value) updateQuery.update({value: value});
        await updateQuery;
    }
};

let modifyTagRouter = async (req, res) => {
    try {
        await modifyTag(req.body);
        res.sendStatus(200);
    } catch (e) {
        console.error(e);
        console.log(e.stackTrace);
        res.sendStatus(400);
    }
};

let assignTag = async (params) => {
    let entityID = params.entityID;
    let entityType = params.entityType;
    let tagID = params.tagID;
    if (tagID && entityID && entityType) {
        let hasTagRows = [];
        for (let i = 0; i < entityID.length; i++) {
            let hasTagRow = {};
            hasTagRow[dbschema.tableContent.has_tag.tagID] = tagID;
            hasTagRow[dbschema.tableContent.has_tag.entityID] = entityID[i];
            hasTagRow[dbschema.tableContent.has_tag.entityType] = entityType;
            hasTagRows.push(hasTagRow)
        }
        await knex(dbschema.tableNames.has_tag)
            .insert(hasTagRows);
    }
};

let assignTagRouter = async (req, res) => {
    try {
        await assignTag(req.body);
        res.sendStatus(200);
    } catch (e) {
        console.error(e);
        console.log(e.stackTrace);
        res.sendStatus(400);
    }
};

let unassignTag = async (params) => {
    let entityID = params.entityID;
    let entityType = params.entityType;
    let tagID = params.tagID;
    if (typeof tagID !== "number") throw "tagID is not a number";
    if (tagID && entityID && entityType) {
        try {
            await knex(dbschema.tableNames.has_tag)
                .where(dbschema.tableContent.has_tag.tagID, tagID)
                .whereIn(dbschema.tableContent.has_tag.entityID, entityID)
                .where(dbschema.tableContent.has_tag.entityType, entityType)
                .del()
        } catch (e) {
            throw "Unassignement failed"
        }
    }
};

let unassignTagRouter = async (req, res) => {
    try {
        await unassignTag(req.body);
        res.sendStatus(200);
    } catch (e) {
        console.error(e);
        console.log(e.stackTrace);
        res.status(400).send(e);
    }
};

let deleteTag = async (params) => {
    let tagID = params.tagID;
    if(tagID){
        await knex(dbschema.tableNames.tag)
            .where(dbschema.tableContent.tag.id, tagID)
            .del();
        await knex(dbschema.tableNames.has_tag)
            .where(dbschema.tableContent.has_tag.tagID, tagID)
            .del();
    }
};

let deleteTagRouter = async (req, res) => {
    try {
        await deleteTag(req.body);
        res.sendStatus(200);
    } catch (e) {
        console.error(e);
        console.log(e.stackTrace);
        res.status(400).send(e);
    }
}

module.exports = {
    getEntityTag: getEntityTag,
    getTagInfo: getTagInfo,
    createNewTagRouter: createNewTagRouter,
    modifyTagRouter: modifyTagRouter,
    assignTagRouter: assignTagRouter,
    unassignTagRouter: unassignTagRouter,
    deleteTagRouter : deleteTagRouter
};