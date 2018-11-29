/*
 * Developed by Steven BUCAILLE on 11/26/18 6:58 PM.
 * Last modified 11/24/18 7:30 PM.
 * Copyright (c) 2018. All right reserved.
 *
 */

let express = require('express');
let router = express.Router();

let mysql = require('../../mysql/mysqlconnection');
let requestFunctions = require('../diagram/functions');
let checkFunctions = require('./check');
let paths = require('../../RestAPI/paths');


router.get('/:primaryPath/:secondaryPath', async (req, res, next) => {
	let primaryPath = req.params.primaryPath;
	let secondaryPath = req.params.secondaryPath;
	let pathData = checkPathExistence(primaryPath, secondaryPath);
	let parameterData = getDataFromQuery(req, pathData.dataName);
	console.log(pathData);
	try {
		let results;
		if (parameterData) {
			if (pathData.dataName === null) {
				results = await requestFunctions[pathData.functionName]();
			}
			else {
				results = await requestFunctions[pathData.functionName](parameterData)
			}
			res.send(results);
		}
		else {
			throw "The parameter " + pathData.dataName + " is not specified";
		}
	}
	catch (e) {
		console.error(e);
		console.log(e.stackTrace);
		res.sendStatus(400);
	}
});

let checkPathExistence = (primaryPath, secondaryPath) => {
	console.log(primaryPath);
	console.log(secondaryPath);
	console.log(paths.primaryPath.pathList);
	if (paths.primaryPath.pathList.includes(primaryPath)) {
		if (paths.secondaryPath[primaryPath].pathList.includes(secondaryPath)) {
			let dataName;
			let functionName = paths.secondaryPath[primaryPath][secondaryPath];
			if (paths.parameterNames[primaryPath][functionName] === "null") dataName = null;
			else dataName = paths.parameterNames[primaryPath][functionName];
			return {
				functionName: functionName,
				dataName: dataName
			}
		}
	}
};

let getDataFromQuery = (request, data) => {
	if (request.body) return request.body[data];
	else if (request.query) return JSON.parse(request.query)[data];
	else throw data + " parameter could not be found.";
};

module.exports = router;