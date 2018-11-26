/*
 * Developed by Steven BUCAILLE on 11/26/18 6:58 PM.
 * Last modified 11/19/18 9:28 PM.
 * Copyright (c) 2018. All right reserved.
 *
 */

let express = require('express');
let router = express.Router();

let mysql = require('../../mysql/mysqlconnection');
let diagramRequests = require('./functions');

router.get('/allID', async (req, res, next) => {
	res.send(await diagramRequests.getAllDiagramsID());
});

router.get('/fromClass', async (req, res, next) => {
	let classID = req.query.classID;
	res.send(await diagramRequests.getDiagramIDFromClass(classID));
});

router.get('/fromAttribute', async (req, res, next) => {
	let attributeID = req.query.attributeID;
	res.send(await diagramRequests.getDiagramIDFromAttribute(attributeID))
});

router.get('/fromMethod', async (req, res, next) => {
	let methodID = req.query.methodID;
	res.send(await diagramRequests.getDiagramIDFromMethod(methodID))
});

router.get('/fromMethodParameter', async (req, res, next) => {
	let methodParameterID = req.query.methodParameterID;
	res.send(await diagramRequests.getDiagramIDFromMethodParameter(methodParameterID))
});

router.get('/fromAssociation', async (req, res, next) => {
	let associationID = req.query.associationID;
	res.send(await diagramRequests.getDiagramIDFromAssociation(associationID))
});

router.get('/fromAssociationEnd', async (req, res, next) => {
	let associationEndID = req.query.associationEndID;
	res.send(await diagramRequests.getDiagramIDFromAssociationEnd(associationEndID));
});

router.get('/fromDependency', async (req, res, next) => {
	let dependencyID = req.query.dependencyID;
	res.send(await diagramRequests.getDiagramIDFromDependency(dependencyID))
});

router.get('/fromRealization', async (req, res, next) => {
	let realizationID = req.query.realizationID;
	res.send(await diagramRequests.getDiagramIDFromRealization(realizationID))
});

router.get('/fromGeneralization', async (req, res, next) => {
	let generalizationID = req.query.generalizationID;
	res.send(await diagramRequests.getDiagramIDFromGeneralization(generalizationID))
});

module.exports = router;