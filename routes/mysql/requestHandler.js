/*
 * Developed by Steven BUCAILLE on 11/27/18 12:24 PM.
 * Last modified 11/27/18 12:24 PM.
 * Copyright (c) 2018. All right reserved.
 *
 */

let resultManipulation = require('./resultManipulation');

let handleParameter = async (parameter, requestFunction) => {

	if (!Array.isArray(parameter)) parameter = [parameter];
	let requestResult = await requestFunction(parameter);
	return resultManipulation.getResultWithLinkedParameter(requestResult);
};

let getDataFromQuery = (request, data) => {
	if (request.body) return requestDataToArray(request.body[data]);
	else if (request.query) return requestDataToArray(JSON.parse(request.query)[data]);
	else throw data + " parameter could not be found.";
};

let requestDataToArray = (data) => {
	if(!Array.isArray(data)) return [data];
	else return data;
}
module.exports = {
	handleParameter: handleParameter,
	getDataFromQuery: getDataFromQuery
};