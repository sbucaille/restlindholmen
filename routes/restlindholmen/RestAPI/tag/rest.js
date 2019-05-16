/*
 * Developed by Steven BUCAILLE on 3/9/19 9:54 PM.
 * Last modified 3/9/19 9:54 PM .
 * Copyright (c) 2019. All right reserved.
 *
 */

let express = require('express');
let router = express.Router();
let tagFunctions = require('./functions');

router.put('/new', tagFunctions.createNewTagRouter);

router.put('/edit', tagFunctions.modifyTagRouter);

router.put('/assign', tagFunctions.assignTagRouter);

router.delete('/unassign', tagFunctions.unassignTagRouter);

router.delete('/delete', tagFunctions.deleteTagRouter);

module.exports = router;
