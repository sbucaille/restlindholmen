/*
 * Developed by Steven BUCAILLE on 11/26/18 6:58 PM.
 * Last modified 11/24/18 7:30 PM.
 * Copyright (c) 2018. All right reserved.
 *
 */

let express = require('express');
let router = express.Router();

let mysql = require('../../mysql/mysqlconnection');
let requestFunctions = {
    testGeneric: require('./functions'),
    diagram: require('../diagram/functions'),
    class: require('../class/functions'),
    attribute: require('../attribute/functions'),
    method: require('../method/functions'),
    methodParam: require('../methodParam/functions'),
    association: require('../association/functions'),
    associationEnd: require('../associationEnd/functions'),
    dependency: require('../dependency/functions'),
    realization: require('../realization/functions'),
    generalization: require('../generalization/functions'),
    umlfile: require('../umlfile/functions'),
    commit: require('../commit/functions'),
    repository: require('../repository/functions'),
    filecommit: require('../filecommit/functions'),
    people: require('../people/functions'),
    user: require('../user/functions'),
    tag: require('../tag/functions')
};
let requestHandler = require('../../mysql/requestHandler');
let checkFunctions = require('./check');

router.post('/:primaryPath/:secondaryPath', async (req, res, next) => {
    let primaryPath = req.params.primaryPath;
    let secondaryPath = req.params.secondaryPath;
    try {
        let pathData = checkFunctions.checkPathExistence(primaryPath, secondaryPath);
        let parameterData = requestHandler.getDataFromQuery(req, pathData.dataName);
        // console.log(primaryPath);
        // console.log(secondaryPath);
        // console.log(pathData);
        // console.log(parameterData);


        let results;
        if (parameterData) {
            if (pathData.dataName === "null") {
                results = await requestFunctions[primaryPath][pathData.functionName]();
            } else if (pathData.dataName === "entityID") {
                results = await requestFunctions[primaryPath][pathData.functionName](secondaryPath, parameterData);
            } else {
                results = await requestFunctions[primaryPath][pathData.functionName](parameterData)
            }
            res.send(results);
        } else {
            throw "The parameter " + pathData.dataName + " is not specified";
        }
    } catch (e) {
        console.error(e);
        console.log(e.stackTrace);
        res.status(400).send(e);
    }
});

module.exports = router;