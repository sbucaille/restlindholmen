/*
 * Developed by Steven BUCAILLE on 11/26/18 6:58 PM.
 * Last modified 11/26/18 2:16 PM.
 * Copyright (c) 2018. All right reserved.
 *
 */

class Diagram {

	constructor(id, fileName = null) {
		this.id = id;
		this._infoLoaded = !!fileName;
		this.fileName = fileName;
		this._areClassLoaded = false;
		this._classList = [];
		this._classes = {
			classList : this._classList
		};
		this.loadClasses();
		this.setupClassProxy();
	}

	get classes() {
		return this._proxyClass;
	}

	async loadClasses() {
		//TODO Requête sur serveur pour aller chercher tous les IDs des classes et les stocker dans le tableau _classes.
		let classesID = await ApiWrapper.getClassesFromDiagram(this.id);
		this._classList.push(...classesID);
		this._areClassLoaded = true;
	}

	setupClassProxy() {
		this._proxyClass = new Proxy(this._classes, {
			get(receiver, id) {
				id = parseInt(id);
				if (receiver[id]) return receiver[id];
				else {
					if(receiver.classList.includes(id)){
						receiver[id] = new Class(id);
						return receiver[id];
					}
					else{
						console.log(id + " doesn't exists in this diagram class list.");
						return null;
					}

				}
			}
		});
	}

	async loadInfo() {

	}

}