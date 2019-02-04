/*
 * Developed by Steven BUCAILLE on 11/26/18 6:58 PM.
 * Last modified 11/26/18 2:16 PM.
 * Copyright (c) 2018. All right reserved.
 *
 */

class Diagram extends Entity {

    constructor(id, loadInfos = autoLoadInfo) {
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

        this._dependencies = {
            idList : [],
            areIDLoaded : false,
        };

        this._realizations = {
            idList : [],
            areIDLoaded : false,
        };

        this._generalizations = {
            idList : [],
            areIDLoaded : false,
        };

        this._umlFiles = {
            idList : [],
            areIDLoaded : false,
        };

        if (loadInfos) {
            this.loadClassesID();
            this.loadAssociationsID();
            this.loadAssociationEndsID();
            this.loadDependenciesID();
            this.loadRealizationsID();
            this.loadGeneralizationsID();
            this.loadUMLFilesID();
        }

        this.setupClassProxy();
        this.setupAssociationProxy();
        this.setupAssociationEndProxy();
        this.setupDependencyProxy();
        this.setupRealizationProxy();
        this.setupGeneralizationProxy();
        this.setupUMLFileProxy();
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
        else throw new ListOfIDNotLoadedException("associationEnds");
    }

    /**
     * Returns a Proxy object containing all the dependencies related to the current diagram.
     * @returns {object} the proxy object.
     */
    get dependencies() {
        if (this._dependencies.areIDLoaded) return this._dependencyProxy;
        else throw new ListOfIDNotLoadedException("dependency");
    }

    /**
     * Returns a Proxy object containing all the realizations related to the current diagram.
     * @returns {object} the proxy object.
     */
    get realizations() {
        if (this._realizations.areIDLoaded) return this._realizationProxy;
        else throw new ListOfIDNotLoadedException("realization");
    }

    /**
     * Returns a Proxy object containing all the generalizations related to the current diagram.
     * @returns {object} the proxy object.
     */
    get generalizations() {
        if (this._generalizations.areIDLoaded) return this._generalizationProxy;
        else throw new ListOfIDNotLoadedException("generalization");
    }

    /**
     * Returns a Proxy object containing all the generalizations related to the current diagram.
     * @returns {object} the proxy object.
     */
    get umlFiles() {
        if (this._umlFiles.areIDLoaded) return this._umlFileProxy;
        else throw new ListOfIDNotLoadedException("umlfile");
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

    //---------------------
    // DEPENDENCY PROXY
    //---------------------

    /**
     * Return the list of dependency ID's related to the current diagram.
     * @returns {Array|*}
     * @throws ListOfIDNotLoadedException
     */
    get dependenciesIDList() {
        if (this._dependencies.areIDLoaded) return this._dependencies.idList;
        else throw new ListOfIDNotLoadedException('dependencies');
    }

    /**
     * Return the number of dependencies related to the current diagram.
     * @returns {number}
     * @throws ListOfIDNotLoadedException
     */
    get numberOfDependencies() {
        if (this._dependencies.areIDLoaded) return this._dependencies.idList.length;
        else throw new ListOfIDNotLoadedException('dependencies');
    }
    /**
     * Loads all dependencies id related to the current diagram and save it in idList parameter.
     * @returns {Promise<void>}
     * @throws ListOfIDAlreadyLoadedException if the associations id list is already loaded.
     */
    async loadDependenciesID() {
        this.loadEntitiesID({
            entityName: "_dependencies",
            wrapperFunction: DependencyWrapper.getDependenciesFromDiagram
        })
    }

    /**
     * Prepares the proxy that will contain all dependencies related to the current diagram.
     * @returns {*}
     * @throws DiagramClassesIndexOutOfRangeException if the id provided is higher than the number of associations the diagram contains
     * @throws ListOfIDNotLoadedException if the associations id list is not loaded in the diagram instance.
     */
    setupDependencyProxy() {
        this._dependencyProxy = Entity.setupProxy(this._dependencies, Dependency);
    }

    //---------------------
    // REALIZATION PROXY
    //---------------------

    /**
     * Return the list of realization ID's related to the current diagram.
     * @returns {Array|*}
     * @throws ListOfIDNotLoadedException
     */
    get realizationsIDList() {
        if (this._realizations.areIDLoaded) return this._realizations.idList;
        else throw new ListOfIDNotLoadedException('realizations');
    }

    /**
     * Return the number of realizations related to the current diagram.
     * @returns {number}
     * @throws ListOfIDNotLoadedException
     */
    get numberOfRealizations() {
        if (this._realizations.areIDLoaded) return this._realizations.idList.length;
        else throw new ListOfIDNotLoadedException('realizations');
    }
    /**
     * Loads all realizations id related to the current diagram and save it in idList parameter.
     * @returns {Promise<void>}
     * @throws ListOfIDAlreadyLoadedException if the associations id list is already loaded.
     */
    async loadRealizationsID() {
        this.loadEntitiesID({
            entityName: "_realizations",
            wrapperFunction: RealizationWrapper.getRealizationsFromDiagram
        })
    }

    /**
     * Prepares the proxy that will contain all realizations related to the current diagram.
     * @returns {*}
     * @throws DiagramClassesIndexOutOfRangeException if the id provided is higher than the number of realizations the diagram contains
     * @throws ListOfIDNotLoadedException if the realizations id list is not loaded in the diagram instance.
     */
    setupRealizationProxy() {
        this._realizationProxy = Entity.setupProxy(this._realizations, Realization);
    }

    //---------------------
    // GENERALIZATION PROXY
    //---------------------

    /**
     * Return the list of realization ID's related to the current diagram.
     * @returns {Array|*}
     * @throws ListOfIDNotLoadedException
     */
    get generalizationsIDList() {
        if (this._generalizations.areIDLoaded) return this._generalizations.idList;
        else throw new ListOfIDNotLoadedException('generalizations');
    }

    /**
     * Return the number of generalizations related to the current diagram.
     * @returns {number}
     * @throws ListOfIDNotLoadedException
     */
    get numberOfGeneralizations() {
        if (this._generalizations.areIDLoaded) return this._generalizations.idList.length;
        else throw new ListOfIDNotLoadedException('generalizations');
    }
    /**
     * Loads all generalizations id related to the current diagram and save it in idList parameter.
     * @returns {Promise<void>}
     * @throws ListOfIDAlreadyLoadedException if the associations id list is already loaded.
     */
    async loadGeneralizationsID() {
        this.loadEntitiesID({
            entityName: "_generalizations",
            wrapperFunction: GeneralizationWrapper.getGeneralizationsFromDiagram
        })
    }

    /**
     * Prepares the proxy that will contain all generalizations related to the current diagram.
     * @returns {*}
     * @throws DiagramClassesIndexOutOfRangeException if the id provided is higher than the number of generalizations the diagram contains
     * @throws ListOfIDNotLoadedException if the generalizations id list is not loaded in the diagram instance.
     */
    setupGeneralizationProxy() {
        this._generalizationProxy = Entity.setupProxy(this._generalizations, Generalization);
    }

    //---------------------
    // UML FILE PROXY
    //---------------------

    /**
     * Return the list of realization ID's related to the current diagram.
     * @returns {Array|*}
     * @throws ListOfIDNotLoadedException
     */
    get umlFilesIDList() {
        if (this._generalizations.areIDLoaded) return this._generalizations.idList;
        else throw new ListOfIDNotLoadedException('generalizations');
    }

    /**
     * Return the number of generalizations related to the current diagram.
     * @returns {number}
     * @throws ListOfIDNotLoadedException
     */
    get numberOfUMLFiles() {
        if (this._generalizations.areIDLoaded) return this._generalizations.idList.length;
        else throw new ListOfIDNotLoadedException('generalizations');
    }
    /**
     * Loads all generalizations id related to the current diagram and save it in idList parameter.
     * @returns {Promise<void>}
     * @throws ListOfIDAlreadyLoadedException if the associations id list is already loaded.
     */
    async loadUMLFilesID() {
        this.loadEntitiesID({
            entityName: "_umlFiles",
            wrapperFunction: UMLFileWrapper.getUmlFileFromDiagram
        })
    }

    /**
     * Prepares the proxy that will contain all generalizations related to the current diagram.
     * @returns {*}
     * @throws DiagramClassesIndexOutOfRangeException if the id provided is higher than the number of generalizations the diagram contains
     * @throws ListOfIDNotLoadedException if the generalizations id list is not loaded in the diagram instance.
     */
    setupUMLFileProxy() {
        this._umlFileProxy = Entity.setupProxy(this._umlFiles, UMLFile);
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

    async loadAllID(){
        this.loadClassesID();
        this.loadAssociationsID();
        this.loadAssociationEndsID();
        this.loadDependenciesID();
        this.loadRealizationsID();
        this.loadGeneralizationsID();
        this.loadUMLFilesID();
    }

}

EntityClasses
    .diagram = Diagram;
