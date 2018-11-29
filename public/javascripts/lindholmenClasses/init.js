/*
 * Developed by Steven BUCAILLE on 11/29/18 7:55 PM.
 * Last modified 11/29/18 7:55 PM.
 * Copyright (c) 2018. All right reserved.
 *
 */

console.log("init");

function httpGet(url, argument) {
	$.ajax({
		url: url,
		type: 'get',
		dataType: 'json',
		contentType: 'application/json',
		success: function (data) {
			console.log(data);
		},
		data: JSON.stringify(argument)
	});
}