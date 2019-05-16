/*
 * Developed by Steven BUCAILLE on 11/26/18 6:58 PM.
 * Last modified 10/30/18 10:29 AM.
 * Copyright (c) 2018. All right reserved.
 *
 */

let express = require('express');
let router = express.Router();

let restlindholmen = require('./restlindholmen/index');
let me = require('./me/index');

let rs = {};

router.use('/restlindholmen', restlindholmen);
router.use('/me', me);

/* GET home page. */
router.get('/', function (req, res) {
    rs.title = 'Steven Bucaille';
    res.render('index', rs);
});

router.get('/home', (req, res) => {
    res.render('index');
});

module.exports = router;
