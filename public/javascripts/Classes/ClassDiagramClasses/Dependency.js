/*
 * Developed by Steven BUCAILLE on 11/27/18 6:13 PM.
 * Last modified 11/27/18 6:13 PM.
 * Copyright (c) 2018. All right reserved.
 *
 */

class Dependency extends Entity {


    constructor(id, loadInfos = autoLoadInfo) {
        super(id, loadInfos, "dependency");
    }

    static entityStringType() {
        return "dependency";
    }

    /**
     * Returns the name of the dependency.
     * @returns {string}
     * @throws InfosNotLoadedException
     */
    get name() {
        return this.genericGetter("_name");
    }

    /**
     * Returns the xmi id of the dependency.
     * @returns {string}
     * @throws InfosNotLoadedException
     */
    get xmiID() {
        return this.genericGetter("_xmiID");
    }

    /**
     * Returns the supplier class ID of the dependency.
     * @returns {string}
     * @throws InfosNotLoadedException
     */
    get supplierClassID() {
        return this.genericGetter("_supplierClassID");
    }

    get supplierClass() {
        return this.genericEntityGetter(this.supplierClassID, Class);
    }

    /**
     * Returns the client class ID of the dependency.
     * @returns {string}
     * @throws InfosNotLoadedException
     */
    get clientClassID() {
        return this.genericGetter("_clientClassID");
    }

    get clientClass() {
        return this.genericEntityGetter(this.clientClassID, Class);
    }

    /**
     * Returns the diagram id of the dependency.
     * @returns {string}
     * @throws InfosNotLoadedException
     */
    get diagramID() {
        return this.genericGetter("_diagramID");
    }

    get diagram() {
        return this.genericEntityGetter(this.diagramID, Diagram);
    }

    /**
     * Loads all info related to the current dependency :
     *  - name
     *  - XMI Dependency ID
     *  - supplier Class ID
     *  - client Class ID
     *  - diagram ID
     * @returns {Promise<void>}
     * @throws InfosAlreadyLoadedException if the dependency infos are already loaded.
     */
    async loadInfo() {
        if (!this._infoLoaded) {
            let info = await DependencyWrapper.getInfo(this.id);
            this._name = info[0][dbschema.db.tableContent.dependency.name];
            this._xmiID = info[0][dbschema.db.tableContent.dependency.xmiID];
            this._diagramID = info[0][dbschema.db.tableContent.dependency.diagramID];
            this._supplierClassID = info[0][dbschema.db.tableContent.dependency.supplierClassID];
            this._clientClassID = info[0][dbschema.db.tableContent.dependency.clientClassID];

            this._infoLoaded = true;
        }
        else throw new InfosAlreadyLoadedException('class');
    }
}