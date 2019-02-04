/*
 * Developed by Steven BUCAILLE on 11/27/18 6:01 PM.
 * Last modified 11/27/18 6:01 PM.
 * Copyright (c) 2018. All right reserved.
 *
 */

class Method extends Entity{

	constructor(id, loadInfos = autoLoadInfo) {
	    super(id, loadInfos, "method");

		this._methodParams = {
			idList: [],
			areIDLoaded: false
		};

		if(loadInfos){
		    this.loadMethodParamsID();
        }
        this.setupMethodParamProxy()
	}

    static entityStringType(){
        return "method";
    }

    /**
     * Returns the name of the method.
     * @returns {string}
     * @throws InfosNotLoadedException
     */
    get name() {
        return this.genericGetter("_name");
    }

    /**
     * Returns the xmi id of the method.
     * @returns {string}
     * @throws InfosNotLoadedException
     */
    get xmiID() {
        return this.genericGetter("_xmiID");
    }

    /**
     * Returns the visibility of the method
     * @returns {VISIBILITY}
     * @throws InfosNotLoadedException
     */
    get visibility() {
        return this.genericGetter("_visibility");
    }

    /**
     * Returns the class ID related to the method.
     * @returns {number}
     * @throws InfosNotLoadedException
     */
    get classID() {
        return this.genericGetter("_classID");
    }

    get class(){
        return this.genericEntityGetter(this.classID, Class);
    }


    get methodParams(){
		return this._methodParamProxy;
	}

    /**
     * Loads all classes id related to the current diagram and save it in idList parameter.
     * @returns {Promise<void>}
     * @throws ListOfIDAlreadyLoadedException if the classes id list is already loaded.
     */
    async loadMethodParamsID() {
        this.loadEntitiesID({
            entityName: "_methodParams",
            wrapperFunction: MethodParamWrapper.getMethodParamsFromMethod
        })
    }

    /**
     * Loads all info related to the current method :
     *    - name
     *    - XMI Attribute ID
     *    - visibility
     *    - class ID
     * @returns {Promise<void>}
     * @throws InfosAlreadyLoadedException if the diagram infos are already loaded
     */
    async loadInfo() {
        if (!this._infoLoaded) {
            let info = await MethodWrapper.getInfo(this.id);
            this._name = info[0][dbschema.db.tableContent.method.name];
            this._xmiID = info[0][dbschema.db.tableContent.method.xmiID];
            this._visibility = Entity.convertVisibility(info[0][dbschema.db.tableContent.method.visibility]);
            this._classID = info[0][dbschema.db.tableContent.method.classID];

            this._infoLoaded = true;
        }
        else {
            throw new InfosAlreadyLoadedException('method');
        }
    }

	setupMethodParamProxy(){
		this._methodParamProxy = Entity.setupProxy(this._methodParams, MethodParam);
	}

	async loadAllID(){
        this.loadMethodParamsID();
    }


}

EntityClasses
    .method = Method;