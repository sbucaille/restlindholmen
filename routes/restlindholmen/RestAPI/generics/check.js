/*
 * Developed by Steven BUCAILLE on 11/26/18 6:58 PM.
 * Last modified 11/24/18 7:22 PM.
 * Copyright (c) 2018. All right reserved.
 *
 */

let dbschema = require('../../../../dbschema').db;
let paths = require('../paths');


let checkTableExistence = (table) => {
	if (Object.keys(dbschema.tablenames).includes(table)) return dbschema.tablenames[table];
	else throw "Table doesn't exist";
};

let checkPathExistence = (primaryPath, secondaryPath) => {
	if (paths.primaryPath.pathList.includes(primaryPath)) {
		if (paths.secondaryPath[primaryPath].pathList.includes(secondaryPath)) {
			let dataName;
			let functionName = paths.secondaryPath[primaryPath][secondaryPath];
			if (paths.parameterNames[primaryPath][functionName] === "null") dataName = null;
			else dataName = paths.parameterNames[primaryPath][functionName];
			return {
				functionName: functionName,
				dataName: dataName
			}
		}
	}
};

module.exports = {
	checkTableExistence : checkTableExistence,
	checkPathExistence: checkPathExistence
}