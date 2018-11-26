/*
 * Developed by Steven BUCAILLE on 11/26/18 6:58 PM.
 * Last modified 11/24/18 8:53 PM.
 * Copyright (c) 2018. All right reserved.
 *
 */

// TODO Envisager la possibilité de demander plusieurs groupes de classes en fonction de plusieurs diagrammes ou plusieurs attributs par exemple.

let express = require('express');
let router = express.Router();

let mysql = require('../../mysql/mysqlconnection');
let classRequests = require('./functions');

router.get('/all', async (req, res, next) => {
	let listOfId = await classRequests.getListOfClassIDs();
	res.send(listOfId);
});

router.get('/fromClassDiagram', async(req, res, next) => {
	let classDiagramID = req.query.classDiagramID;
	let results = await classRequests.getListOfClassIDsFromClassDiagram(classDiagramID);
	res.send(results);
})

router.get('/attributes', async (req, res, next) => {
	let classId = req.query.classId;
	let attributes = await classRequests.getListOfAttributeIDs(classId);
	res.send(attributes);
});

module.exports = router;