/*
 * Developed by Steven BUCAILLE on 11/26/18 6:58 PM.
 * Last modified 10/30/18 10:29 AM.
 * Copyright (c) 2018. All right reserved.
 *
 */

var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;
