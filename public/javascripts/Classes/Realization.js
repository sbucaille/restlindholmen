/*
 * Developed by Steven BUCAILLE on 11/27/18 6:17 PM.
 * Last modified 11/27/18 6:17 PM.
 * Copyright (c) 2018. All right reserved.
 *
 */

class Realization extends Entity{

    constructor(id, loadInfos = false) {
        super(id, loadInfos, "realization");
    }

    /**
     * Returns the name of the realization.
     * @returns {string}
     * @throws InfosNotLoadedException
     */
    get name() {
        return this.genericGetter("_name");
    }

    /**
     * Returns the xmi id of the realization.
     * @returns {string}
     * @throws InfosNotLoadedException
     */
    get xmiID() {
        return this.genericGetter("_xmiID");
    }

    /**
     * Returns the supplier class ID of the realization.
     * @returns {string}
     * @throws InfosNotLoadedException
     */
    get supplierClassID() {
        return this.genericGetter("_supplierClassID");
    }

    /**
     * Returns the client class ID of the realization.
     * @returns {string}
     * @throws InfosNotLoadedException
     */
    get clientClassID() {
        return this.genericGetter("_clientClassID");
    }

    /**
     * Returns the diagram id of the realization.
     * @returns {string}
     * @throws InfosNotLoadedException
     */
    get diagramID() {
        return this.genericGetter("_diagramID");
    }

    /**
     * Loads all info related to the current realization :
     *  - name
     *  - XMI Realization ID
     *  - supplier Class ID
     *  - client Class ID
     *  - diagram ID
     * @returns {Promise<void>}
     * @throws InfosAlreadyLoadedException if the realization infos are already loaded.
     */
    async loadInfo() {
        if (!this._infoLoaded) {
            let info = await RealizationWrapper.getInfo(this.id);
            this._name = info[0][dbschema.db.tableContent.realization.name];
            this._xmiID = info[0][dbschema.db.tableContent.realization.xmiID];
            this._diagramID = info[0][dbschema.db.tableContent.realization.diagramID];
            this._supplierClassID = info[0][dbschema.db.tableContent.realization.supplierClassID];
            this._clientClassID = info[0][dbschema.db.tableContent.realization.clientClassID];

            this._infoLoaded = true;
        }
        else throw new InfosAlreadyLoadedException('class');
    }
}