/*
 * Developed by Steven BUCAILLE on 12/1/18 1:54 PM.
 * Last modified 12/1/18 1:54 PM.
 * Copyright (c) 2018. All right reserved.
 *
 */

class Attribute extends Entity {

    constructor(id, loadInfos = false) {
        super(id, loadInfos, "attribute");
    }

    static entityStringType(){
        return "attribute";
    }

    /**
     * Returns the name of the attribute.
     * @returns {string}
     * @throws InfosNotLoadedException
     */
    get name() {
        return this.genericGetter("_name");
    }

    /**
     * Returns the xmi id of the attribute.
     * @returns {string}
     * @throws InfosNotLoadedException
     */
    get xmiID() {
        return this.genericGetter("_xmiID");
    }

    /**
     * Returns the visibility of the attribute
     * @returns {VISIBILITY}
     * @throws InfosNotLoadedException
     */
    get visibility() {
        return this.genericGetter("_visibility");
    }

    /**
     * Returns the type of the attribute.
     * @returns {string}
     * @throws InfosNotLoadedException
     */
    get type() {
        return this.genericGetter("_type");
    }

    /**
     * Returns the class ID related to the attribute.
     * @returns {number}
     * @throws InfosNotLoadedException
     */
    get classID() {
        return this.genericGetter("_classID");
    }

    get class() {
        return this.genericEntityGetter(this.classID, Class);
    }

    /**
     * Loads all info related to the current attribute :
     *    - name
     *    - XMI Attribute ID
     *    - visibility
     *    - class ID
     *    - type
     * Instanciate the class related to the attribute if it is not already set.
     * @returns {Promise<void>}
     * @throws InfosAlreadyLoadeq<dException if the attribute infos are already loaded.
     */
    async loadInfo() {
        if (!this._infoLoaded) {
            let info = await AttributeWrapper.getInfo(this.id);
            this._name = info[0][dbschema.db.tableContent.attribute.name];
            this._xmiID = info[0][dbschema.db.tableContent.attribute.xmiID];
            this._visibility = Entity.convertVisibility(info[0][dbschema.db.tableContent.attribute.visibility]);
            this._classID = info[0][dbschema.db.tableContent.attribute.classID];
            this._type = info[0][dbschema.db.tableContent.attribute.type];

            this._infoLoaded = true;
        }
        else throw new InfosAlreadyLoadedException('attribute')
    }
}