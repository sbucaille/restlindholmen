/*
 * Developed by Steven BUCAILLE on 11/26/18 6:58 PM.
 * Last modified 11/19/18 9:28 PM.
 * Copyright (c) 2018. All right reserved.
 *
 */

let express = require('express');
let router = express.Router();

let mysql = require('../../mysql/mysqlconnection');
let classDiagramsRequests = require('./functions');

router.get('/clsname', async (req, res, next) => {
	let classname = req.params.clsname;
	res.send(await classDiagramsRequests.getClassDiagramByName(classname));
});

router.get('/idlist', async (req, res, next) => {
	let listOfId = await classDiagramsRequests.getListOfClassDiagramIds();
	res.send(listOfId);
});

module.exports = router;