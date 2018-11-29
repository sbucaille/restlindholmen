/*
 * Developed by Steven BUCAILLE on 11/27/18 6:01 PM.
 * Last modified 11/27/18 6:01 PM.
 * Copyright (c) 2018. All right reserved.
 *
 */

class Method {

	constructor(id, name, visibility, XMIMethodID, classID) {
		this._id = id;
		this._name = name;
		this._visibility = visibility;
		this._XMIMethodID = XMIMethodID;
		this._classID = classID;
		this._areMethodParamsLoaded = false;
	}
}