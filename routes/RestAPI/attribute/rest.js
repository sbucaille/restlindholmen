/*
 * Developed by Steven BUCAILLE on 11/26/18 6:58 PM.
 * Last modified 11/24/18 7:41 PM.
 * Copyright (c) 2018. All right reserved.
 *
 */

let express = require('express');
let router = express.Router();

let mysql = require('../../mysql/mysqlconnection');
let attributeRequests = require('./functions');

router.get('/idlist', async (req, res, next) => {
	let listOfId = await attributeRequests.getListOfAttributeIds();
	res.send(listOfId);
})

router.get('/id', async (req, res, next) => {
	let id = req.query.id;
	let results = await attributeRequests.getAttributeInfoFromID(id);
	res.send(results);
})

router.get('/fromClassDiagram', async (req, res, next) => {
	let classDiagramId = req.query.classDiagramId;
	let results = await attributeRequests.getListOfAttributeIdsFromClassDiagram(classDiagramId);
	res.send(results);
})

router.get('/fromClass', async (req, res, next) => {
	let classId = req.query.classId;
	let results = await attributeRequests.getListOfAttributeIdsFromClass(classId);
	res.send(results);
})

router.get('/onCriteria', async (req, res, next) => {
	let criteria = req.body;
	let decision = attributeRequests.getCriteriasFromRequest(criteria);
	res.sendStatus(200);
})

module.exports = router;