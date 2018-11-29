/*
 * Developed by Steven BUCAILLE on 11/26/18 6:58 PM.
 * Last modified 11/24/18 7:22 PM.
 * Copyright (c) 2018. All right reserved.
 *
 */

let dbschema = require('../../../dbschema').db;

let checkTableExistence = (table) => {
	if (Object.keys(dbschema.tablenames).includes(table)) return dbschema.tablenames[table];
	else throw "Table doesn't exist";
};

module.exports = {
	checkTableExistence : checkTableExistence
}