/*
 * Developed by Steven BUCAILLE on 11/26/18 6:58 PM.
 * Last modified 11/24/18 8:53 PM.
 * Copyright (c) 2018. All right reserved.
 *
 */

let express = require('express');
let router = express.Router();

let requestHandler = require('../../mysql/requestHandler');
let classRequests = require('./functions');

router.get('/allID', async (req, res, next) => {
	res.send(await classRequests.getAllClassesID())
});

router.post('/fromDiagram', async (req, res, next) => {
	let diagramID;
	if(diagramID = requestHandler.getDataFromQuery(req, "diagramID")){
		res.send(await classRequests.getClassesFromDiagram(diagramID))
	}
	else {
		res.sendStatus(400);
	}
});

router.get('/fromAttribute', async (req, res, next) => {
	let attributeID = req.body.attributeID;
	res.send(await classRequests.getClassIDFromAttribute(attributeID))
});

router.get('/fromMethod', async (req, res, next) => {
	let methodID = req.body.methodID;
	res.send(await classRequests.getClassIDFromMethod(methodID))
});

router.get('/fromMethodParam', async (req, res, next) => {
	let methodParamID = req.body.methodParamID;
	res.send(await classRequests.getClassIDFromMethodParam(methodParamID))
});

router.get('/fromAssociation', async (req, res, next) => {
	let associationID = req.body.associationID;
	res.send(await classRequests.getClassesIDFromAssociation(associationID))
});

router.get('/fromAssociationEnd', async (req, res, next) => {
	let associationEndID = req.body.associationEndID;
	res.send(await classRequests.getClassIDFromAssociationEnd(associationEndID))
});

router.get('/fromDependency', async (req, res, next) => {
	let dependencyID = req.body.dependencyID;
	res.send(await classRequests.getClassesIDFromDependency(dependencyID))
});

router.get('/fromDependency/supplierClass', async (req, res, next) => {
	let dependencyID = req.body.dependencyID;
	res.send(await classRequests.getSupplierClassIDFromDependency(dependencyID))
});

router.get('/fromDependency/clientClass', async (req, res, next) => {
	let dependencyID = req.body.dependencyID;
	res.send(await classRequests.getClientClassIDFromDependency(dependencyID))
});

router.get('/fromRealization', async (req, res, next) => {
	let dependencyID = req.body.realizationID;
	res.send(await classRequests.getClassesIDFromRealization(dependencyID))
});

router.get('/fromRealization/supplierClass', async (req, res, next) => {
	let dependencyID = req.body.realizationID;
	res.send(await classRequests.getSupplierClassIDFromRealization(dependencyID))
});

router.get('/fromRealization/clientClass', async (req, res, next) => {
	let dependencyID = req.body.realizationID;
	res.send(await classRequests.getClientClassIDFromRealization(dependencyID))
});

router.get('/fromGeneralization', async (req, res, next) => {
	let generalizationID = req.body.generalizationID;
	res.send(await classRequests.getClassesIDFromGeneralization(generalizationID))
});

router.get('/fromGeneralization/childClass', async (req, res, next) => {
	let dependencyID = req.body.generalizationID;
	res.send(await classRequests.getChildClassIDFromGeneralization(generalizationID))
});

router.get('/fromGeneralization/parentClass', async (req, res, next) => {
	let dependencyID = req.body.generalizationID;
	res.send(await classRequests.getParentClassIDFromGeneralization(generalizationID))
});

module.exports = router;