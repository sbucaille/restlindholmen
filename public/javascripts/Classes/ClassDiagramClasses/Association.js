/*
 * Developed by Steven BUCAILLE on 11/27/18 6:05 PM.
 * Last modified 11/27/18 6:05 PM.
 * Copyright (c) 2018. All right reserved.
 *
 */

class Association extends Entity {

    constructor(id, loadInfos = autoLoadInfo) {
        super(id, loadInfos, "association");

        this._associationEnds = {
            idList: [],
            areIDLoaded: false
        };

        if (loadInfos) {
            this.loadAssociationEndsID();
        }
        this.setupAssociationEndProxy();
    }

    static entityStringType(){
        return "association";
    }

    /**
     * Returns the visibility of the association
     * @returns {VISIBILITY}
     * @throws InfosNotLoadedException
     */
    get visibility() {
        return this.genericGetter("_visibility");
    }

    /**
     * Returns the xmi id of the association.
     * @returns {string}
     * @throws InfosNotLoadedException
     */
    get xmiID() {
        return this.genericGetter("_xmiID");
    }

    /**
     * Returns the diagram ID related to the association.
     * @returns {number}
     * @throws InfosNotLoadedException
     */
    get diagramID() {
        return this.genericGetter("_diagramID");
    }

    get diagram() {
        return this.genericEntityGetter(this.diagramID, Diagram);
    }

    get associationEnds() {
        return this._associationEndProxy;
    }

    /**
     * Loads all association ends id related to the current diagram and save it in idlist parameter.
     * @returns {Promise<void>}
     * @throws ListOfIDAlreadyLoadedException if the classes id list is already loaded.
     */
    async loadAssociationEndsID() {
        this.loadEntitiesID({
            entityName: "_associationEnds",
            wrapperFunction: AssociationEndWrapper.getAssociationEndsFromAssociation
        })
    }

    /**
     * Loads all info related to the current association :
     *    - XMI Association ID
     *    - visibility
     *    - diagram ID
     * Instanciate the class related to the association if it is not already set.
     * @returns {Promise<void>}
     * @throws InfosAlreadyLoadedException if the attribute infos are already loaded.
     */
    async loadInfo() {
        if (!this._infoLoaded) {
            let info = await AssociationWrapper.getInfo(this.id);
            this._xmiID = info[0][dbschema.db.tableContent.association.xmiID];
            this._visibility = Entity.convertVisibility(info[0][dbschema.db.tableContent.association.visibility]);
            this._diagramID = info[0][dbschema.db.tableContent.association.diagramID];

            this._infoLoaded = true;
        }
        else throw new InfosAlreadyLoadedException('attribute')
    }

    setupAssociationEndProxy() {
        this._associationEndProxy = Entity.setupProxy(this._associationEnds, AssociationEnd)
    }

    async loadAllID(){
        this.loadAssociationEndsID();
    }
}

EntityClasses
    .association = Association;