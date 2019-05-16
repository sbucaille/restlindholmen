/*
 * Developed by Steven BUCAILLE on 11/26/18 6:58 PM.
 * Last modified 11/19/18 9:28 PM.
 * Copyright (c) 2018. All right reserved.
 *
 */

let express = require('express');
let router = express.Router();

let diagramRequests = require('./functions');
let requestHandler = require('../../mysql/requestHandler');

router.get('/allID', async (req, res, next) => {
	res.send(await diagramRequests.getAllDiagramsID());
});

router.get('/fromClass', async (req, res, next) => {
	let classID = req.body.classID;
	res.send(await requestHandler.handleParameter(classID, diagramRequests.getDiagramIDFromClass))
});

router.get('/fromAttribute', async (req, res, next) => {
	let attributeID = req.body.attributeID;
	res.send(await requestHandler.handleParameter(attributeID, diagramRequests.getDiagramIDFromAttribute))
});

router.get('/fromMethod', async (req, res, next) => {
	let methodID = req.body.methodID;
	res.send(await requestHandler.handleParameter(methodID, diagramRequests.getDiagramIDFromMethod));
});

router.get('/fromMethodParameter', async (req, res, next) => {
	let methodParameterID = req.body.methodParameterID;
	res.send(await requestHandler.handleParameter(methodParameterID, diagramRequests.getDiagramIDFromMethodParameter))
});

router.get('/fromAssociation', async (req, res, next) => {
	let associationID = req.body.associationID;
	res.send(await requestHandler.handleParameter(associationID, diagramRequests.getDiagramIDFromAssociation))
});

router.get('/fromAssociationEnd', async (req, res, next) => {
	let associationEndID = req.body.associationEndID;
	res.send(await requestHandler.handleParameter(associationEndID, diagramRequests.getDiagramIDFromAssociationEnd))
});

router.get('/fromDependency', async (req, res, next) => {
	let dependencyID = req.body.dependencyID;
	res.send(await requestHandler.handleParameter(dependencyID, diagramRequests.getDiagramIDFromDependency))
});

router.get('/fromRealization', async (req, res, next) => {
	let realizationID = req.body.realizationID;
	res.send(await requestHandler.handleParameter(realizationID, diagramRequests.getDiagramIDFromRealization))
});

router.get('/fromGeneralization', async (req, res, next) => {
	let generalizationID = req.body.generalizationID;
	res.send(await requestHandler.handleParameter(generalizationID, diagramRequests.getDiagramIDFromGeneralization))
});

module.exports = router;