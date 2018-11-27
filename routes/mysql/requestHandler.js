/*
 * Developed by Steven BUCAILLE on 11/27/18 12:24 PM.
 * Last modified 11/27/18 12:24 PM.
 * Copyright (c) 2018. All right reserved.
 *
 */

let resultManipulation = require('./resultManipulation');

let handleParameter = async (parameter, requestFunction) => {

	if(!Array.isArray(parameter)) parameter = [parameter];
	let requestResult = await requestFunction(parameter);
	return resultManipulation.getResultWithLinkedParameter(requestResult);
};

module.exports = {
	handleParameter : handleParameter
};