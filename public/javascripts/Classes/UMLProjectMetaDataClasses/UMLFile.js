/*
 * Developed by Steven BUCAILLE on 1/3/19 10:34 PM.
 * Last modified 1/3/19 10:31 PM .
 * Copyright (c) 2019. All right reserved.
 *
 */


class UMLFile extends Entity {

    constructor(id, loadInfos = autoLoadInfo) {
        super(id, loadInfos, "umlfile");
    }

    static entityStringType(){
        return "umlfile";
    }

    /**
     * Return the name of the file.
     * @returns {string}
     * @throws InfosNotLoadedException
     */
    get name() {
        return this.genericGetter("_name");
    }

    /**
     * Return the url to the file.
     * @returns {string}
     * @throws InfosNotLoadedException
     */
    get url() {
        return this.genericGetter("_url");
    }

    /**
     * Return the commit ID of the file.
     * @returns {string}
     * @throws InfosNotLoadedException
     */
    get commitID() {
        return this.genericGetter("_commitID");
    }

    get commit(){
        return this.genericEntityGetter(this.commitID, Commit);
    }

    /**
     * Return the repository ID of the file.
     * @returns {string}
     * @throws InfosNotLoadedException
     */
    get repositoryID() {
        return this.genericGetter("_repositoryID");
    }

    get repository(){
        return this.genericEntityGetter(this.repositoryID, Repository);
    }

    /**
     * Return the XMI ID of the file. No matter if it exists or not.
     * @returns {string}
     * @throws InfosNotLoadedException
     */
    get diagramID() {
        return this.genericGetter("_diagramID");
    }

    get diagram(){
        return this.genericEntityGetter(this.diagramID, Diagram);
    }

    /**
     * Return the type to the file.
     * @returns {string}
     * @throws InfosNotLoadedException
     */
    get type() {
        return this.genericGetter("_type");
    }

    /**
     * Loads all info related to the current uml file :
     * - name
     * - url
     * - commit ID
     * - repository ID
     * - diagram ID
     * - type
     * @returns {Promise<void>}
     * @throws InfosAlreadyLoadedException if the uml file infos are already loaded
     */
    async loadInfo() {
        if (!this._infoLoaded) {
            let info = await UMLFileWrapper.getInfo(this.id);
            this._name = info[0][dbschema.db.tableContent.umlfile.name];
            this._url = info[0][dbschema.db.tableContent.umlfile.url];
            this._commitID = info[0][dbschema.db.tableContent.umlfile.commitID];
            this._repositoryID = info[0][dbschema.db.tableContent.umlfile.repositoryID];
            this._diagramID = info[0][dbschema.db.tableContent.umlfile.diagramID];
            this._type = info[0][dbschema.db.tableContent.umlfile.type];

            this._infoLoaded = true;
        }
        else {
            throw new InfosAlreadyLoadedException('umlfile');
        }
    }
}

EntityClasses
    .umlFile = UMLFile;