/*
 * Developed by Steven BUCAILLE on 11/27/18 6:19 PM.
 * Last modified 11/27/18 6:19 PM.
 * Copyright (c) 2018. All right reserved.
 *
 */

class Generalization extends Entity{

	constructor(id, loadInfos = autoLoadInfo) {
		super(id, loadInfos, 'generalization');
	}

    static entityStringType(){
        return "generalization";
    }

    /**
     * Returns the name of the generalization.
     * @returns {string}
     * @throws InfosNotLoadedException
     */
    get name() {
        return this.genericGetter("_name");
    }

    /**
     * Returns the xmi id of the generalization.
     * @returns {string}
     * @throws InfosNotLoadedException
     */
    get xmiID() {
        return this.genericGetter("_xmiID");
    }

    /**
     * Returns the child class ID of the generalization.
     * @returns {string}
     * @throws InfosNotLoadedException
     */
    get childClassID() {
        return this.genericGetter("_childClassID");
    }

    get childClass(){
        return this.genericEntityGetter(this.childClassID, Class);
    }

    /**
     * Returns the parent class ID of the generalization.
     * @returns {string}
     * @throws InfosNotLoadedException
     */
    get parentClassID() {
        return this.genericGetter("_parentClassID");
    }

    get parentClass(){
        return this.genericEntityGetter(this.parentClassID, Class);
    }

    /**
     * Returns the diagram id of the generalization.
     * @returns {string}
     * @throws InfosNotLoadedException
     */
    get diagramID() {
        return this.genericGetter("_diagramID");
    }

    /**
     * Loads all info related to the current generalization :
     *  - name
     *  - XMI Generalization ID
     *  - child Class ID
     *  - parent Class ID
     *  - diagram ID
     * @returns {Promise<void>}
     * @throws InfosAlreadyLoadedException if the generalization infos are already loaded.
     */
    async loadInfo() {
        if (!this._infoLoaded) {
            let info = await GeneralizationWrapper.getInfo(this.id);
            this._name = info[0][dbschema.db.tableContent.generalization.name];
            this._xmiID = info[0][dbschema.db.tableContent.generalization.xmiID];
            this._diagramID = info[0][dbschema.db.tableContent.generalization.diagramID];
            this._childClassID = info[0][dbschema.db.tableContent.generalization.childClassID];
            this._parentClassID = info[0][dbschema.db.tableContent.generalization.parentClassID];

            this._infoLoaded = true;
        }
        else throw new InfosAlreadyLoadedException('generalization');
    }
}