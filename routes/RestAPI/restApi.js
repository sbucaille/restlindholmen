/*
 * Developed by Steven BUCAILLE on 11/26/18 6:58 PM.
 * Last modified 11/24/18 6:40 PM.
 * Copyright (c) 2018. All right reserved.
 *
 */

let express = require('express');
let router = express.Router();

let mysql = require('../mysql/mysqlconnection');

let classDiagramAPI = require('./diagram/rest');
let repositoryAPI = require('./repository/rest');
let classAPI = require('./class/rest');
let attributeAPI = require('./attribute/rest');
let operationAPI = require('./method/rest');
let genericsAPI = require('./generics/rest');

router.use('/diagram', classDiagramAPI);
router.use('/repository', repositoryAPI);
router.use('/class', classAPI);
router.use('/attribute', attributeAPI);
router.use('/method', operationAPI);
router.use('/generics', genericsAPI);

router.get('/getDBSchemaJSON', (req, res, next) => {
	res.send(require('./../../dbschema'));
})

router.post('/testPost', (req, res, next) => {
	console.log(req.body);
	res.sendStatus(200);
});

router.get('/testKnex', (req, res, next) => {
	let classname = req.query.clsname;
	console.log(classname);
	db.select().from('cd_class').where('cls_name', 'like', '%' + classname + '%')
})

module.exports = router;