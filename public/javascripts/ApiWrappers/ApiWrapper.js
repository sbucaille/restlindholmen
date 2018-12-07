/*
 * Developed by Steven BUCAILLE on 11/26/18 6:58 PM.
 * Last modified 11/26/18 6:58 PM.
 * Copyright (c) 2018. All right reserved.
 *
 */

console.log("import ApiWrapper");

class ApiWrapper {

	static async getClasses() {
		return await httpGet('/api/generics/class/allID', {})
	}

	static async getClass(classID) {
		return await httpGet('/api/generics/class/info', {classID : classID})
	}

	static async getClassesFromDiagram(diagramID) {
		return await httpGet('/api/generics/class/fromDiagram', {diagramID: diagramID})
	}
}