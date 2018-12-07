/*
 * Developed by Steven BUCAILLE on 11/26/18 6:58 PM.
 * Last modified 11/26/18 3:36 PM.
 * Copyright (c) 2018. All right reserved.
 *
 */

class Class {

	constructor(id, name, xmiClassID, visibility) {
		this._id = id;
		this._name = name;
		this._XMIClassID = xmiClassID;
		this._visibility = visibility;
		this._areAttributesLoaded = false;
		this._areMethodsLoaded = false;
		this.loadInfos();
	}

	async loadInfos() {
		let infos = await ApiWrapper.getClass(this._id);
		console.log(infos);
		console.log(infos[0][dbschema.db.tableContent.class.id]);
	}
}