/*
 * Developed by Steven BUCAILLE on 11/26/18 6:58 PM.
 * Last modified 11/24/18 9:07 PM.
 * Copyright (c) 2018. All right reserved.
 *
 */

let knex = require('../../mysql/mysqlconnection').knex;
let dbSchema = require('../../../../dbschema').db;
let dbTableNames = dbSchema.tableNames;
let dbTableContent = dbSchema.tableContent;
let resultManipulation = require('../../mysql/resultManipulation');
let requestHandler = require('../../mysql/requestHandler');
let tagFunctions = require('../tag/functions');

let applyFilter = (filter, filterName, tableName, query) => {
    if (Array.isArray(filter[filterName])) query.andWhere(dbTableContent[tableName][filterName], 'in', filter[filterName]);
    else query.andWhere(dbTableContent[tableName][filterName], 'like', filter[filterName]);
};

let addAssociationsToRelationObject = async (classID, relations) => {
    let assocResult = await knex
        .select(dbTableContent.associationEnd.associationID)
        .from(dbTableNames.associationEnd)
        .where(dbTableContent.associationEnd.classID, '=', classID);

    for (let i = 0; i < assocResult.length; i++) {
        let assocId = assocResult[i][dbTableContent.associationEnd.associationID];
        let associatedClassResult = await knex
            .select(dbTableContent.associationEnd.classID)
            .from(dbTableNames.associationEnd)
            .where(function () {
                this
                    .where(dbTableContent.associationEnd.associationID, assocId)
                    .andWhere(dbTableContent.associationEnd.classID, 'NOT LIKE', classID)
            });
        if (associatedClassResult.length > 0) {
            let associatedClassID = associatedClassResult[0][dbTableContent.associationEnd.classID];
            relations.push({
                type: "association",
                id: assocId,
                targetClassID: associatedClassID
            });
        }
    }
};

let addDependencyToRelationObject = async (classID, relations) => {
    let dependencyResult1 = await knex
        .select(dbTableContent.dependency.clientClassID, dbTableContent.dependency.id)
        .from(dbTableNames.dependency)
        .where(dbTableContent.dependency.supplierClassID, classID);
    for (let i = 0; i < dependencyResult1.length; i++) {
        relations.push({
            type: "dependency",
            id: dependencyResult1[i][dbTableContent.dependency.id],
            targetClassID: dependencyResult1[i][dbTableContent.dependency.clientClassID]
        })
    }

    let dependencyResult2 = await knex
        .select(dbTableContent.dependency.supplierClassID, dbTableContent.dependency.id)
        .from(dbTableNames.dependency)
        .where(dbTableContent.dependency.clientClassID, classID);
    for (let i = 0; i < dependencyResult2.length; i++) {
        relations.push({
            type: "dependency",
            id: dependencyResult2[i][dbTableContent.dependency.id],
            targetClassID: dependencyResult2[i][dbTableContent.dependency.supplierClassID]
        })
    }
};

let addRealizationToRelationObject = async (classID, relations) => {
    let realizationResult1 = await knex
        .select(dbTableContent.realization.clientClassID, dbTableContent.realization.id)
        .from(dbTableNames.realization)
        .where(dbTableContent.realization.supplierClassID, classID);
    for (let i = 0; i < realizationResult1.length; i++) {
        relations.push({
            type: "realization",
            id: realizationResult1[i][dbTableContent.realization.id],
            targetClassID: realizationResult1[i][dbTableContent.realization.clientClassID]
        })
    }

    let realizationResult2 = await knex
        .select(dbTableContent.realization.supplierClassID, dbTableContent.realization.id)
        .from(dbTableNames.realization)
        .where(dbTableContent.realization.clientClassID, classID);
    for (let i = 0; i < realizationResult2.length; i++) {
        relations.push({
            type: "realization",
            id: realizationResult2[i][dbTableContent.realization.id],
            targetClassID: realizationResult2[i][dbTableContent.realization.supplierClassID]
        })
    }
};

let addGeneralizationToRelationObject = async (classID, relations) => {
    let generalizationResult1 = await knex
        .select(dbTableContent.generalization.parentClassID, dbTableContent.generalization.id)
        .from(dbTableNames.generalization)
        .where(dbTableContent.generalization.childClassID, classID);
    for (let i = 0; i < generalizationResult1.length; i++) {
        relations.push({
            type: "generalization",
            id: generalizationResult1[i][dbTableContent.generalization.id],
            targetClassID: generalizationResult1[i][dbTableContent.generalization.parentClassID]
        })
    }

    let generalizationResult2 = await knex
        .select(dbTableContent.generalization.childClassID, dbTableContent.generalization.id)
        .from(dbTableNames.generalization)
        .where(dbTableContent.generalization.parentClassID, classID);
    for (let i = 0; i < generalizationResult2.length; i++) {
        relations.push({
            type: "generalization",
            id: generalizationResult2[i][dbTableContent.generalization.id],
            targetClassID: generalizationResult2[i][dbTableContent.generalization.childClassID]
        })
    }
};

let addRelationsOfTheClass = async (classID, relations) => {
    await addAssociationsToRelationObject(classID, relations);
    await addDependencyToRelationObject(classID, relations);
    await addRealizationToRelationObject(classID, relations);
    await addGeneralizationToRelationObject(classID, relations)
};

let addAttributesOfTheClass = async (classID, attributes) => {
    let attributesResult = await knex
        .select()
        .from(dbTableNames.attribute)
        .where(dbTableContent.attribute.classID, classID);
    for (let i = 0; i < attributesResult.length; i++) {
        attributes.push({
            id: attributesResult[i][dbTableContent.attribute.id],
            name: attributesResult[i][dbTableContent.attribute.name],
            visibility: attributesResult[i][dbTableContent.attribute.visibility],
            type: attributesResult[i][dbTableContent.attribute.type],
        })
    }
};

let addParamsOfTheMethod = async (methodID, params) => {
    let paramsResult = await knex
        .select()
        .from(dbTableNames.methodParam)
        .where(dbTableContent.methodParam.methodID, methodID);

    for (let i = 0; i < paramsResult.length; i++) {
        params.push({
            id: paramsResult[i][dbTableContent.methodParam.id],
            name: paramsResult[i][dbTableContent.methodParam.name],
            visibility: paramsResult[i][dbTableContent.methodParam.visibility]
        })
    }
};

let addMethodsOfTheClass = async (classID, methods) => {
    let methodsResult = await knex
        .select()
        .from(dbTableNames.method)
        .where(dbTableContent.method.classID, classID);

    for (let i = 0; i < methodsResult.length; i++) {
        let params = [];
        let methodID = methodsResult[i][dbTableContent.method.id];
        methods.push({
            id: methodID,
            name: methodsResult[i][dbTableContent.method.name],
            visibilty: methodsResult[i][dbTableContent.method.visibility],
            params: params
        });
        await addParamsOfTheMethod(methodID, params);
    }
};

let addAttributeNameCounter = async (attributes, attributeNameCounter) => {
    for (let i = 0; i < attributes.length; i++) {
        if (attributeNameCounter[attributes[i].name]) {
            attributeNameCounter[attributes[i].name]++;
        } else {
            attributeNameCounter[attributes[i].name] = 1;
        }
    }
}

/**
 * Array typed query.
 * @returns {Promise<Array>}
 */
let getAllClassesID = async () => {
    let query = knex
        .select(dbTableContent.class.id)
        .from(dbTableNames.class);
    return resultManipulation.getArrayFromResult(await query)
};

/**
 * EntityInfo typed query.
 * @param classID
 * @returns {Promise<{class: *}>}
 */
let getClassInfo = async (classID) => {
    let classesInfo = knex
        .select()
        .from(dbTableNames.class);

    requestHandler.applyFilter(classID[0], 'class', classesInfo);
    console.log(classesInfo.toString());
    classesInfo = await classesInfo;
    let result = [];
    for (let i = 0; i < classesInfo.length; i++) {
        let classInfo = classesInfo[i];
        let classId = classInfo[dbTableContent.class.id];
        let relations = [];
        let attributes = [];
        let methods = [];
        result.push({
            id: classId,
            name: classInfo[dbTableContent.class.name],
            visibility: classInfo[dbTableContent.class.visibility],
            diagramID: classInfo[dbTableContent.class.diagramID],
            xmiID: classInfo[dbTableContent.class.xmiID],
            relations: relations,
            attributes: attributes,
            methods: methods
        });
        await addRelationsOfTheClass(classId, relations);
        await addAttributesOfTheClass(classId, attributes);
        await addMethodsOfTheClass(classId, methods);
    }
    return {
        classes: result
    }
};

let getTagFromClass = async (classID) => {
    return await tagFunctions.getTagFromEntity("class", classID);
}

/**
 * ParameterLinked typed query.
 * @param diagramID
 * @returns {Promise<{}>}
 */
let getClassesFromDiagram = async (diagramID) => {
    return resultManipulation.getResultWithLinkedParameter(
        await knex
            .select(
                dbTableContent.class.diagramID + ' as parameter',
                dbTableContent.class.id
            )
            .from(dbTableNames.class)
            .whereIn(
                dbTableContent.class.diagramID,
                diagramID
            ));
};

let getClassIDFromAttribute = async (attributeID) => {
    return resultManipulation.getResultWithLinkedParameter(
        await knex
            .select(
                dbTableContent.attribute.id + ' as parameter',
                dbTableContent.attribute.classID
            )
            .from(dbTableNames.attribute)
            .whereIn(
                dbTableContent.attribute.id,
                attributeID
            )
    )
};

let getClassIDFromMethod = async (methodID) => {
    return resultManipulation.getResultWithLinkedParameter(
        await knex
            .select(
                dbTableContent.method.id + ' as parameter',
                dbTableContent.method.classID
            )
            .from(dbTableNames.method)
            .whereIn(
                dbTableContent.method.id,
                methodID
            )
    )
};

let getClassIDFromMethodParam = async (methodParamID) => {
    return resultManipulation.getResultWithLinkedParameter(
        await knex
            .select(
                dbTableNames.methodParam + '.' + dbTableContent.methodParam.id + ' as parameter',
                dbTableContent.method.classID
            )
            .from(dbTableNames.method)
            .innerJoin(
                dbTableNames.methodParam,
                dbTableNames.method + '.' + dbTableContent.method.id,
                '=',
                dbTableNames.methodParam + '.' + dbTableContent.methodParam.methodID
            )
            .whereIn(
                dbTableNames.methodParam + '.' + dbTableContent.methodParam.id,
                methodParamID
            )
    )
};

let getClassesIDFromAssociation = async (associationID) => {
    return resultManipulation.getResultWithLinkedParameter(
        await knex
            .select(
                dbTableNames.association + '.' + dbTableContent.association.id + ' as parameter',
                dbTableContent.associationEnd.classID
            )
            .from(dbTableNames.associationEnd)
            .innerJoin(
                dbTableNames.association,
                dbTableNames.associationEnd + '.' + dbTableContent.associationEnd.associationID,
                '=',
                dbTableNames.association + '.' + dbTableContent.association.id
            )
            .whereIn(
                dbTableNames.association + '.' + dbTableContent.association.id,
                associationID
            )
    )
};

let getClassIDFromAssociationEnd = async (associationEndID) => {
    return resultManipulation.getResultWithLinkedParameter(
        await knex
            .select(
                dbTableContent.associationEnd.id + ' as parameter',
                dbTableContent.associationEnd.classID
            )
            .from(dbTableNames.associationEnd)
            .whereIn(
                dbTableContent.associationEnd.id,
                associationEndID
            )
    )
};

let getClassesIDFromDependency = async (dependencyID) => {
    return resultManipulation.getResultWithLinkedParameter(
        await knex
            .select(
                dbTableContent.dependency.id + ' as parameter',
                dbTableContent.dependency.supplierClassID,
                dbTableContent.dependency.clientClassID
            )
            .from(dbTableNames.dependency)
            .whereIn(
                dbTableContent.dependency.id,
                dependencyID
            )
    )
};

let getSupplierClassIDFromDependency = async (dependencyID) => {
    return resultManipulation.getResultWithLinkedParameter(
        await knex
            .select(
                dbTableContent.dependency.id + ' as parameter',
                dbTableContent.dependency.supplierClassID
            )
            .from(dbTableNames.dependency)
            .whereIn(
                dbTableContent.dependency.id,
                dependencyID
            )
    )
};

let getClientClassIDFromDependency = async (dependencyID) => {
    return resultManipulation.getResultWithLinkedParameter(
        await knex
            .select(
                dbTableContent.dependency.id + ' as parameter',
                dbTableContent.dependency.clientClassID
            )
            .from(dbTableNames.dependency)
            .whereIn(
                dbTableContent.dependency.id,
                dependencyID
            )
    )
};

let getClassesIDFromRealization = async (realizationID) => {
    return resultManipulation.getResultWithLinkedParameter(
        await knex
            .select(
                dbTableContent.realization.id + ' as parameter',
                dbTableContent.realization.supplierClassID,
                dbTableContent.realization.clientClassID
            )
            .from(dbTableNames.realization)
            .whereIn(
                dbTableContent.realization.id,
                realizationID
            )
    )
};

let getSupplierClassIDFromRealization = async (realization) => {
    return resultManipulation.getResultWithLinkedParameter(
        await knex
            .select(
                dbTableContent.realization.id + ' as parameter',
                dbTableContent.realization.supplierClassID
            )
            .from(dbTableNames.realization)
            .whereIn(
                dbTableContent.realization.id,
                realization
            )
    )
};

let getClientClassIDFromRealization = async (realizationID) => {
    return resultManipulation.getResultWithLinkedParameter(
        await knex
            .select(
                dbTableContent.realization.id + ' as parameter',
                dbTableContent.realization.clientClassID
            )
            .from(dbTableNames.realization)
            .whereIn(
                dbTableContent.realization.id,
                realizationID
            )
    )
};

let getClassesIDFromGeneralization = async (generalizationID) => {
    return resultManipulation.getResultWithLinkedParameter(
        await knex
            .select(
                dbTableContent.generalization.id + ' as parameter',
                dbTableContent.generalization.childClassID,
                dbTableContent.generalization.parentClassID
            )
            .from(dbTableNames.generalization)
            .whereIn(
                dbTableContent.generalization.id,
                generalizationID
            )
    )
};

let getChildClassIDFromGeneralization = async (generalizationID) => {
    return resultManipulation.getResultWithLinkedParameter(
        await knex
            .select(
                dbTableContent.generalization.id + ' as parameter',
                dbTableContent.generalization.childClassID
            )
            .from(dbTableNames.generalization)
            .whereIn(
                dbTableContent.generalization.id,
                generalizationID
            )
    )
};

let getParentClassIDFromGeneralization = async (generalizationID) => {
    return resultManipulation.getResultWithLinkedParameter(
        await knex
            .select(
                dbTableContent.generalization.id + ' as parameter',
                dbTableContent.generalization.parentClassID
            )
            .from(dbTableNames.generalization)
            .whereIn(
                dbTableContent.generalization.id,
                generalizationID
            )
    )
};

module.exports = {
    getAllClassesID: getAllClassesID,
    getClassInfo: getClassInfo,
    getTagFromClass : getTagFromClass,
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