let express = require('express');
let router = express.Router();

router.get('/', (req, res, next) =>{
	console.log()
	res.sendStatus(200);
})

module.exports = router;