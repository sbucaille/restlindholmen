/*
 * Developed by Steven BUCAILLE on 11/26/18 9:17 PM.
 * Last modified 11/26/18 9:17 PM.
 * Copyright (c) 2018. All right reserved.
 *
 */

let getArrayFromResult = (results) => {
	let tabOfIds = [];
	results.forEach((result) => {
		tabOfIds.push(result.id)
	});
	return tabOfIds;
}

module.exports = {
	getArrayFromResult: getArrayFromResult
}