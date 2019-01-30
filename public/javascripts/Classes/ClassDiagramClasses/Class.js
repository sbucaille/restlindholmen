/*
 * Developed by Steven BUCAILLE on 11/26/18 6:58 PM.
 * Last modified 11/26/18 3:36 PM.
 * Copyright (c) 2018. All right reserved.
 *
 */

class Class extends Entity {

    constructor(id, loadInfos = autoLoadInfo) {
        super(id, loadInfos, "class");

        this._attributes = {
            idList: [],
            areIDLoaded: false
        };

        this._methods = {
            idList: [],
            areIDLoaded: false
        };

        if (loadInfos) {
            this.loadAttributesID();
            this.loadMethodsID();
        }
        this.setupAttributeProxy();
        this.setupMethodProxy();
    }

    static entityStringType() {
        return "class";
    }

    /**
     * Returns the name of the class.
     * @returns {string}
     * @throws InfosNotLoadedException
     */
    get name() {
        return this.genericGetter("_name")
    }

    /**
     * Returns the xmi id of the class.
     * @returns {string}
     * @throws InfosNotLoadedException
     */
    get xmiID() {
        return this.genericGetter("_xmiID")
    }

    /**
     * Returns the visibility of the class.
     * @returns {VISIBILITY}
     * @throws InfosNotLoadedException
     */
    get visibility() {
        return this.genericGetter("_visibility");
    }

    /**
     * Returns the diagram ID related to the class.
     * @returns {number}
     * @throws InfosNotLoadedException
     */
    get diagramID() {
        return this.genericGetter("_diagramID");
    }

    get diagram() {
        return this.genericEntityGetter(this.diagramID, Diagram);
    }

    /**
     * Returns a Proxy object containing all the attributes related to the current class.
     * @returns {object} the proxy object.
     */
    get attributes() {
        return this._attributeProxy;
    }

    /**
     * Return the list of attribute ID's related to the current class.
     * @returns {Array|*}
     * @throws ListOfIDNotLoadedException
     */
    get attributesIDList() {
        if (this._attributes.areIDLoaded) return this._attributes.idList;
        else {
            throw new ListOfIDNotLoadedException('attributes');
        }
    }

    /**
     * Return the number of attributes related to the current class
     * @returns {number}
     * @throws ListOfIDNotLoadedException
     */
    get numberOfAttributes() {
        if (this._attributes.areIDLoaded) return this._attributes.idList.length;
        else {
            throw new ListOfIDNotLoadedException('attributes');
        }
    }

    /**
     * Returns a Proxy object containing all the methods related to the current class.
     * @returns {object} the proxy object.
     */
    get methods() {
        return this._methodProxy;
    }

    /**
     * Returns the list of method ID's related to the current class.
     * @returns {Array|*}
     * @throws ListOfIDNotLoadedException
     */
    get methodsIDList() {
        if (this._methods.areIDLoaded) return this._methods.idList;
        else throw new ListOfIDNotLoadedException('methods');
    }

    /**
     * Returns the number of methods related to the current class.
     * @returns {number}
     * @throws ListOfIDNotLoadedException
     */
    get numberOfMethods() {
        if (this._methods.areIDLoaded) return this._methods.idList.length;
        else throw new ListOfIDNotLoadedException('methods');
    }

    /**
     * Loads all attributes id related to the current class and save it in attributesIDList parameter.
     * @returns {Promise<void>}
     * @throws ListOfIDAlreadyLoadedException if the attributes id list is already loaded.
     */
    async loadAttributesID() {
        super.loadEntitiesID({
            entityName: "_attributes",
            wrapperFunction: AttributeWrapper.getAttributesFromClass
        })
    }

    /**
     * Loads all methods id related to the current class and save it in methodsIDList parameter.
     * @returns {Promise<void>}
     * @throws ListOfIDAlreadyLoadedException if the methods id list is already loaded.
     */
    async loadMethodsID() {
        super.loadEntitiesID({
            entityName: "_methods",
            wrapperFunction: MethodWrapper.getMethodsFromClass
        })
    }

    /**
     * Loads all info related to the current class :
     *  - name
     *  - XMI Class ID
     *  - visiblity
     *  - diagram ID
     * Instanciate the diagram related to the class if it is not already set.
     * @returns {Promise<void>}
     * @throws InfosAlreadyLoadedException if the class infos are already loaded.
     */
    async loadInfo() {
        if (!this._infoLoaded) {
            let infos = await ClassWrapper.getInfo(this.id);
            this._name = infos[0][dbschema.db.tableContent.class.name];
            this._xmiID = infos[0][dbschema.db.tableContent.class.xmiID];
            this._visibility = Entity.convertVisibility(infos[0][dbschema.db.tableContent.class.visibility]);
            this._diagramID = infos[0][dbschema.db.tableContent.class.diagramID];

            console.log(this._diagramID);
            this._infoLoaded = true;
        }
        else throw new InfosAlreadyLoadedException('class');
    }

    /**
     * Prepares the proxy that will contain all attributes related to the current class.
     * @returns {*}
     * @throws EntityIndexOutOfRangeException if the id provided is higher than the number of attributes the class contains.
     * @throws ListOfIDNotLoadedException if the attributes id list is not loaded in the class instance.
     */
    setupAttributeProxy() {
        this._attributeProxy = Entity.setupProxy(this._attributes, Attribute);
    }

    /**
     * Prepares the proxy that will contain all methods related to the current class.
     * @returns {*}
     * @throws ClassMethodsIndexOutOfRangeException id provided is higher than the number of methods the class contains.
     * @throws ListOfIDNotLoadedException if the methods id list is not loaded in the class instance.
     */
    setupMethodProxy() {
        this._methodProxy = Entity.setupProxy(this._methods, Method)
    }

    async loadAllID(){
        this.loadAttributesID();
        this.loadMethodsID();
    }
}