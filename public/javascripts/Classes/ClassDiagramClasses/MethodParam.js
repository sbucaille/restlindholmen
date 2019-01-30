/*
 * Developed by Steven BUCAILLE on 11/27/18 6:04 PM.
 * Last modified 11/27/18 6:04 PM.
 * Copyright (c) 2018. All right reserved.
 *
 */

class MethodParam extends Entity{

	constructor(id, loadInfos = autoLoadInfo) {
		super(id, loadInfos, "methodParam");
	}

    static entityStringType(){
        return "methodParam";
    }

    /**
     * Returns the name of the method parameter.
     * @returns {string}
     * @throws InfosNotLoadedException
     */
    get name() {
        return this.genericGetter("_name");
    }

    /**
     * Returns the visibility of the method parameter
     * @returns {VISIBILITY}
     * @throws InfosNotLoadedException
     */
    get visibility() {
        return this.genericGetter("_visibility");
    }

    /**
     * Returns the method ID related to the method parameter.
     * @returns {number}
     * @throws InfosNotLoadedException
     */
    get methodID() {
        return this.genericGetter("_methodID");
    }

    get method() {
        return this.genericEntityGetter(this.methodID, Method);
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
     * @throws InfosAlreadyLoadedException if the attribute infos are already loaded.
     */
    async loadInfo() {
        if (!this._infoLoaded) {
            let info = await MethodParamWrapper.getInfo(this.id);
            this._name = info[0][dbschema.db.tableContent.methodParam.name];
            this._visibility = Entity.convertVisibility(info[0][dbschema.db.tableContent.methodParam.visibility]);
            this._methodID = info[0][dbschema.db.tableContent.methodParam.methodID];

            this._infoLoaded = true;
        }
        else throw new InfosAlreadyLoadedException('methodParam')
    }
}