/*
 * Developed by Steven BUCAILLE on 11/27/18 6:05 PM.
 * Last modified 11/27/18 6:05 PM.
 * Copyright (c) 2018. All right reserved.
 *
 */

class Association{

	constructor(id, visibility, diagramID, XMIAssociationID) {
		this._id = id;
		this._visibility = visibility;
		this._diagramID = diagramID;
		this._XMIAssociationID = XMIAssociationID;
		this._areAssociationEndLoaded = false;
	}
}