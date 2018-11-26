/*
 * Developed by Steven BUCAILLE on 11/26/18 6:58 PM.
 * Last modified 11/26/18 2:16 PM.
 * Copyright (c) 2018. All right reserved.
 *
 */

class Diagram {
	_classes;
	_areClassLoaded;

	constructor(id, fileName) {
		this._areClassLoaded = false;
		this.id = id;
		this.fileName = fileName;
	}

	async get classes() {
		if (this._areClassLoaded) {
			//TODO Ajouter un Proxy de Class.
			let proxy = new Proxy(this._classes, {
				get (id) {
					//TODO Récupération de la classe sur la base de données et de tous ses éléments.
					let classInfo = API.getClasse();
					return new Class(classInfo);
				}
			})
			return this._classes;
		}
		else {
			await this.loadClasses();
			return this._classes;
		}
	}

	async loadClasses() {
		//TODO Requête sur serveur pour aller chercher tous les IDs des classes et les stocker dans le tableau _classes.
		this._areClassLoaded = true;
	}

}