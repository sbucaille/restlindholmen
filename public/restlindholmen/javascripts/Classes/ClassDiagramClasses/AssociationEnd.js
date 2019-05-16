/*
 * Developed by Steven BUCAILLE on 11/27/18 6:10 PM.
 * Last modified 11/27/18 6:10 PM.
 * Copyright (c) 2018. All right reserved.
 *
 */

class AssociationEnd extends Entity{

	constructor(id, loadInfos = autoLoadInfo) {
		super(id, loadInfos, "associationEnd");
	}

    static entityStringType(){
        return "associationEnd";
    }

    /**
     * Returns the name of the association end.
     * @returns {string}
     * @throws InfosNotLoadedException
     */
    get name() {
        return this.genericGetter("_name")
    }

    /**
     * Returns the visibility of the association end.
     * @returns {VISIBILITY}
     * @throws InfosNotLoadedException
     */
    get visibility() {
        return this.genericGetter("_visibility")
    }

    /**
     * Returns the xmi id of the association end.
     * @returns {string}
     * @throws InfosNotLoadedException
     */
    get xmiID() {
        return this.genericGetter("_xmiID")
    }

    /**
     * Returns if the association end is navigable or not.
     * @returns {boolean}
     * @throws InfosNotLoadedException
     */
    get isNavigable() {
        return this.genericGetter("_isNavigable")
    }

    /**
     * Returns the ordering type of the association end.
     * @returns {string}
     * @throws InfosNotLoadedException
     */
    get ordering() {
        return this.genericGetter("_ordering")
    }

    /**
     * Returns the aggregation type of the association end.
     * @returns {string}
     * @throws InfosNotLoadedException
     */
    get aggregation() {
        return this.genericGetter("_aggregation")
    }

    /**
     * Returns the class ID linked to the association end.
     * @returns {string}
     * @throws InfosNotLoadedException
     */
    get classID() {
        return this.genericGetter("_classID")
    }

    get class() {
        return this.genericEntityGetter(this.classID, Class);
    }

    /**
     * Returns the diagram ID of the association end.
     * @returns {string}
     * @throws InfosNotLoadedException
     */
    get diagramID() {
        return this.genericGetter("_diagramID")
    }

    get diagram() {
        return this.genericEntityGetter(this.diagramID, Diagram);
    }

    /**
     * Returns the name of the association end.
     * @returns {string}
     * @throws InfosNotLoadedException
     */
    get associationID() {
        return this.genericGetter("_associationID")
    }

    get association() {
        return this.genericEntityGetter(this.associationID, Association);
    }

    /**
     * Loads all info related to the current association end :
     *  - name
     *  - XMI AssociationEnd ID
     *  - visiblity
     *  - isNavigable
     *  - ordering type
     *  - aggregation type
     *  - class ID
     *  - association ID
     *  - diagram ID
     * @returns {Promise<void>}
     * @throws InfosAlreadyLoadedException if the class infos are already loaded.
     */
    async loadInfo() {
        if (!this._infoLoaded) {
            let info = await AssociationEndWrapper.getInfo(this.id);
            this._name = info[0][dbschema.db.tableContent.associationEnd.name];
            this._xmiID = info[0][dbschema.db.tableContent.associationEnd.xmiID];
            this._visibility = Entity.convertVisibility(info[0][dbschema.db.tableContent.associationEnd.visibility]);
            this._diagramID = info[0][dbschema.db.tableContent.associationEnd.diagramID];
            this._classID = info[0][dbschema.db.tableContent.associationEnd.classID];
            this._associationID = info[0][dbschema.db.tableContent.associationEnd.associationID];
            this._isNavigable = info[0][dbschema.db.tableContent.associationEnd.isNavigable];
            this._ordering = info[0][dbschema.db.tableContent.associationEnd.ordering];
            this._aggregation= info[0][dbschema.db.tableContent.associationEnd.aggregation];

            this._infoLoaded = true;
        }
        else throw new InfosAlreadyLoadedException('class');
    }
}

EntityClasses
    .associationEnd = AssociationEnd;