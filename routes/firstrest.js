let express = require('express');
let router = express.Router();

let mysql = require('./mysql/mysqlconnection');

router.get('/', (req, res, next) => {
	console.log()
	res.sendStatus(200);
});

router.get('/class', (req, res, next) => {
	let classname = req.query.clsname;
	console.log(classname);
	mysql.query('select * from cd_class where cls_name LIKE "%' + classname + '%"',
		(error, results, fields) => {
			if (error) throw error;
			res.send(results);
		});
})

module.exports = router;