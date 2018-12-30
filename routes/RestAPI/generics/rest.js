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
	testGeneric : require('./functions'),
	diagram : require('../diagram/functions'),
	class : require('../class/functions'),
	attribute : require('../attribute/functions'),
	method : require('../method/functions'),
	association : require('../association/functions'),
	associationEnd : require('../associationEnd/functions'),
	dependency : require('../dependency/functions'),
	realization : require('../realization/functions'),
	generalization : require('../generalization/functions')
};
let requestHandler = require('../../mysql/requestHandler');
let checkFunctions = require('./check');

router.post('/:primaryPath/:secondaryPath', async (req, res, next) => {
	let primaryPath = req.params.primaryPath;
	let secondaryPath = req.params.secondaryPath;
	let pathData = checkFunctions.checkPathExistence(primaryPath, secondaryPath);
	let parameterData = requestHandler.getDataFromQuery(req, pathData.dataName);
	try {
		let results;
		if (parameterData) {
			if (pathData.dataName === "null") {
				results = await requestFunctions[primaryPath][pathData.functionName]();
			}
			else {
				results = await requestFunctions[primaryPath][pathData.functionName](parameterData)
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

router.post('/class/getAllInfo', async (req, res, next) => {
	console.log("got it");
	res.sendStatus(200);
})

module.exports = router;