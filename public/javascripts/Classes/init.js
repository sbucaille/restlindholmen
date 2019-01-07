/*
 * Developed by Steven BUCAILLE on 1/4/19 2:09 PM.
 * Last modified 12/27/18 5:18 PM .
 * Copyright (c) 2019. All right reserved.
 *
 */

console.log("init");
let dbschema;
document.EntityInstances = {};

async function httpGet(url, argument) {
	const rawResponse = await fetch(url, {
		method: 'POST',
		headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(argument)
	});
	return await rawResponse.json()
}

async function getDbSchemaJSON() {
	const rawResponse = await fetch('/api/getDBSchemaJSON', {
		method: 'GET',
		headers: {
			'Accept': 'application/json',
		}
	});
	dbschema = await rawResponse.json()
}

getDbSchemaJSON();