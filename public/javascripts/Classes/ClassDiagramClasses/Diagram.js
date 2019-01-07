/*
 * Developed by Steven BUCAILLE on 11/26/18 6:58 PM.
 * Last modified 11/26/18 2:16 PM.
 * Copyright (c) 2018. All right reserved.
 *
 */

class Diagram extends Entity {

    constructor(id, loadInfos = false) {
        super(id, loadInfos, "diagram");
        this._classes = {
            idList: [],
            areIDLoaded: false
        };

        this._associations = {
            idList : [],
            areIDLoaded : false,
        };

        this._associationEnds = {
            idList : [],
            areIDLoaded : false,
        };

        if (loadInfos) {
            this.loadClassesID();
            this.loadAssociationsID();
            this.loadAssociationEndsID();
        }

        this.setupClassProxy();
        this.setupAssociationProxy();
        this.setupAssociationEndProxy();
    }

    static entityStringType(){
        return "diagram";
    }

    /**
     * Return the filename parameter of the diagram.
     * @returns {string}
     * @throws InfosNotLoadedException
     */
    get fileName() {
        return this.genericGetter("_fileName");
    }

    /**
     * Returns a Proxy object containing all the classes related to the current diagram.
     * @returns {object} the proxy object.
     */
    get classes() {
        if (this._classes.areIDLoaded) return this._classProxy;
        else throw new ListOfIDNotLoadedException("classes");
    }

    /**
     * Returns a Proxy object containing all the associations related to the current diagram.
     * @returns {object} the proxy object.
     */
    get associations() {
        if (this._associations.areIDLoaded) return this._associationProxy;
        else throw new ListOfIDNotLoadedException("associations");
    }

    /**
     * Returns a Proxy object containing all the association ends related to the current diagram.
     * @returns {object} the proxy object.
     */
    get associationEnds() {
        if (this._associationEnds.areIDLoaded) return this._associationEndProxy;
        else throw new ListOfIDNotLoadedException("associations");
    }

    //----------------
    // CLASSES PROXY
    //----------------
    /**
     * Return the list of class ID's related to the current diagram.
     * @returns {Array|*}
     * @throws ListOfIDNotLoadedException
     */
    get classesIDList() {
        if (this._classes.areIDLoaded) return this._classes.idList;
        else throw new ListOfIDNotLoadedException('classes');
    }

    /**
     * Return the number of classes related to the current diagram.
     * @returns {number}
     * @throws ListOfIDNotLoadedException
     */
    get numberOfClasses() {
        if (this._classes.areIDLoaded) return this._classes.idList.length;
        else throw new ListOfIDNotLoadedException('classes');
    }

    /**
     * Loads all classes id related to the current diagram and save it in idList parameter.
     * @returns {Promise<void>}
     * @throws ListOfIDAlreadyLoadedException if the classes id list is already loaded.
     */
    async loadClassesID() {
        this.loadEntitiesID({
            entityName: "_classes",
            wrapperFunction: ClassWrapper.getClassesFromDiagram
        })
    }

    /**
     * Prepares the proxy that will contain all classes related to the current diagram.
     * @returns {*}
     * @throws DiagramClassesIndexOutOfRangeException if the id provided is higher than the number of classes the diagram contains
     * @throws ListOfIDNotLoadedException if the classes id list is not loaded in the diagram instance.
     */
    setupClassProxy() {
        this._classProxy = Entity.setupProxy(this._classes, Class);
    }

    //---------------------
    // ASSOCIATIONS PROXY
    //---------------------

    /**
     * Return the list of association ID's related to the current diagram.
     * @returns {Array|*}
     * @throws ListOfIDNotLoadedException
     */
    get associationsIDList() {
        if (this._associations.areIDLoaded) return this._associations.idList;
        else throw new ListOfIDNotLoadedException('associations');
    }

    /**
     * Return the number of associations related to the current diagram.
     * @returns {number}
     * @throws ListOfIDNotLoadedException
     */
    get numberOfAssociations() {
        if (this._associations.areIDLoaded) return this._associations.idList.length;
        else throw new ListOfIDNotLoadedException('associations');
    }
    /**
     * Loads all associations id related to the current diagram and save it in idList parameter.
     * @returns {Promise<void>}
     * @throws ListOfIDAlreadyLoadedException if the associations id list is already loaded.
     */
    async loadAssociationsID() {
        this.loadEntitiesID({
            entityName: "_associations",
            wrapperFunction: AssociationWrapper.getAssociationsFromDiagram
        })
    }


    /**
     * Prepares the proxy that will contain all associations related to the current diagram.
     * @returns {*}
     * @throws DiagramClassesIndexOutOfRangeException if the id provided is higher than the number of associations the diagram contains
     * @throws ListOfIDNotLoadedException if the associations id list is not loaded in the diagram instance.
     */
    setupAssociationProxy() {
        this._associationProxy = Entity.setupProxy(this._associations, Association);
    }

    //---------------------
    // ASSOCIATION ENDS PROXY
    //---------------------

    /**
     * Return the list of association end ID's related to the current diagram.
     * @returns {Array|*}
     * @throws ListOfIDNotLoadedException
     */
    get associationEndsIDList() {
        if (this._associationEnds.areIDLoaded) return this._associationEnds.idList;
        else throw new ListOfIDNotLoadedException('associationEnds');
    }

    /**
     * Return the number of association ends related to the current diagram.
     * @returns {number}
     * @throws ListOfIDNotLoadedException
     */
    get numberOfAssociationEnds() {
        if (this._associationEnds.areIDLoaded) return this._associationEnds.idList.length;
        else throw new ListOfIDNotLoadedException('associationEnds');
    }
    /**
     * Loads all association ends id related to the current diagram and save it in idList parameter.
     * @returns {Promise<void>}
     * @throws ListOfIDAlreadyLoadedException if the associations id list is already loaded.
     */
    async loadAssociationEndsID() {
        this.loadEntitiesID({
            entityName: "_associationEnds",
            wrapperFunction: AssociationEndWrapper.getAssociationEndsFromDiagram
        })
    }


    /**
     * Prepares the proxy that will contain all association ends related to the current diagram.
     * @returns {*}
     * @throws DiagramClassesIndexOutOfRangeException if the id provided is higher than the number of associations the diagram contains
     * @throws ListOfIDNotLoadedException if the associations id list is not loaded in the diagram instance.
     */
    setupAssociationEndProxy() {
        this._associationEndProxy = Entity.setupProxy(this._associationEnds, AssociationEnd);
    }

    /**
     * Loads all info related to the current diagram :
     *  - The filename
     * @returns {Promise<void>}
     * @throws InfosAlreadyLoadedException if the diagram infos are already loaded
     */
    async loadInfo() {
        if (!this._infoLoaded) {
            let info = await DiagramWrapper.getInfo(this.id);
            this._fileName = info[0][dbschema.db.tableContent.diagram.filePath];
            this._infoLoaded = true;
        }
        else {
            throw new InfosAlreadyLoadedException('diagram');
        }
    }

}