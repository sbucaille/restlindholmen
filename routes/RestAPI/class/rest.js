/*
 * Developed by Steven BUCAILLE on 11/26/18 6:58 PM.
 * Last modified 11/24/18 8:53 PM.
 * Copyright (c) 2018. All right reserved.
 *
 */

// TODO Envisager la possibilité de demander plusieurs groupes de classes en fonction de plusieurs diagrammes ou plusieurs attributs par exemple.

let express = require('express');
let router = express.Router();

let classRequests = require('./functions');

router.get('/allID', async (req, res, next) => {
	res.send(await classRequests.getAllClassesID())
});

router.get('/fromDiagram', async (req, res, next) => {
	let diagramID = req.query.diagramID;
	res.send(await classRequests.getClassesFromDiagram(diagramID))
});

router.get('/fromAttribute', async (req, res, next) => {
	let attributeID = req.query.attributeID;
	res.send(await classRequests.getClassIDFromAttribute(attributeID))
});

router.get('/fromMethod', async (req, res, next) => {
	let methodID = req.query.methodID;
	res.send(await classRequests.getClassIDFromMethod(methodID))
});

router.get('/fromMethodParam', async (req, res, next) => {
	let methodParamID = req.query.methodParamID;
	res.send(await classRequests.getClassIDFromMethodParam(methodParamID))
});

router.get('/fromAssociation', async (req, res, next) => {
	let associationID = req.query.associationID;
	res.send(await classRequests.getClassesIDFromAssociation(associationID))
});

router.get('/fromAssociationEnd', async (req, res, next) => {
	let associationEndID = req.query.associationEndID;
	res.send(await classRequests.getClassIDFromAssociationEnd(associationEndID))
});

router.get('/fromDependency', async (req, res, next) => {
	let dependencyID = req.query.dependencyID;
	res.send(await classRequests.getClassesIDFromDependency(dependencyID))
});

router.get('/fromDependency/supplierClass', async (req, res, next) => {
	let dependencyID = req.query.dependencyID;
	res.send(await classRequests.getSupplierClassIDFromDependency(dependencyID))
});

router.get('/fromDependency/clientClass', async (req, res, next) => {
	let dependencyID = req.query.dependencyID;
	res.send(await classRequests.getClientClassIDFromDependency(dependencyID))
});

router.get('/fromRealization', async (req, res, next) => {
	let dependencyID = req.query.realizationID;
	res.send(await classRequests.getClassesIDFromRealization(dependencyID))
});

router.get('/fromRealization/supplierClass', async (req, res, next) => {
	let dependencyID = req.query.realizationID;
	res.send(await classRequests.getSupplierClassIDFromRealization(dependencyID))
});

router.get('/fromRealization/clientClass', async (req, res, next) => {
	let dependencyID = req.query.realizationID;
	res.send(await classRequests.getClientClassIDFromRealization(dependencyID))
});

router.get('/fromGeneralization', async (req, res, next) => {
	let generalizationID = req.query.generalizationID;
	res.send(await classRequests.getClassesIDFromGeneralization(generalizationID))
});

router.get('/fromGeneralization/childClass', async (req, res, next) => {
	let dependencyID = req.query.generalizationID;
	res.send(await classRequests.getChildClassIDFromGeneralization(generalizationID))
});

router.get('/fromGeneralization/parentClass', async (req, res, next) => {
	let dependencyID = req.query.generalizationID;
	res.send(await classRequests.getParentClassIDFromGeneralization(generalizationID))
});

module.exports = router;