/*
 * Developed by Steven BUCAILLE on 11/26/18 6:58 PM.
 * Last modified 11/12/18 4:39 PM.
 * Copyright (c) 2018. All right reserved.
 *
 */

let express = require('express');
let router = express.Router();

let mysql = require('../../mysql/mysqlconnection').connection;
let knex = require('../../mysql/mysqlconnection').knex;

var isISODate = require('is-iso-date');

router.get('/repository', (req, res, next) => {
	let repositoryName = req.query.name;
	let lastCommitCondition = req.query.lastCommitCondition;
	let sqlQuery;
	if (isISODate(lastCommitCondition)) {
		sqlQuery = 'SELECT * FROM repos WHERE name LIKE "%' + repositoryName + '%" AND last_commit> "' + lastCommitCondition + '";';
	}
	else {
		sqlQuery = 'SELECT * FROM repos WHERE name LIKE "%' + repositoryName + '%";';
	}

	console.log(sqlQuery);
	mysql.query(sqlQuery, (error, results, fields) => {
		if (error) throw error;
		res.send(results);
	});
});

router.get('/repository/:id', (req, res, next) => {
	let id = req.params.id;
	knex.select().from()
	res.send(200);
})

module.exports = router;