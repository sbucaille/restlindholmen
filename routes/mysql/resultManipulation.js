/*
 * Developed by Steven BUCAILLE on 11/26/18 9:17 PM.
 * Last modified 11/26/18 9:17 PM.
 * Copyright (c) 2018. All right reserved.
 *
 */

let getArrayFromResult = (results) => {
	let tabOfIds = [];
	results.forEach((result) => {
		tabOfIds.push(result[Object.keys(result)[0]])
	});
	return tabOfIds;
};

let getResultWithLinkedParameter = (result) => {
	let toReturn = {};
	result.forEach(r => {
		if(toReturn[r.parameter]){
			toReturn[r.parameter].push(r);
		}
		else{
			toReturn[r.parameter] = [];
			toReturn[r.parameter].push(r);
		}
		delete toReturn[r.parameter][toReturn[r.parameter].length - 1].parameter;
	});
	return toReturn;
}

module.exports = {
	getArrayFromResult: getArrayFromResult,
	getResultWithLinkedParameter: getResultWithLinkedParameter
}