/*
 * Developed by Steven BUCAILLE on 11/29/18 7:55 PM.
 * Last modified 11/29/18 7:55 PM.
 * Copyright (c) 2018. All right reserved.
 *
 */

console.log("init");
let dbschema;

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