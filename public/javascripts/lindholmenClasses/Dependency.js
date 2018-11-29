/*
 * Developed by Steven BUCAILLE on 11/27/18 6:13 PM.
 * Last modified 11/27/18 6:13 PM.
 * Copyright (c) 2018. All right reserved.
 *
 */

class Dependency {


	constructor(id, name, XMIDependencyID, supplierClassID, clientClassID, diagramID,) {
		this._id = id;
		this._name = name;
		this._XMIDependencyID = XMIDependencyID;
		this._supplierClassID = supplierClassID;
		this._clientClassID = clientClassID;
		this._diagramID = diagramID;
	}
}