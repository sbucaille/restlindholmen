/*
 * Developed by Steven BUCAILLE on 1/4/19 1:45 AM.
 * Last modified 1/4/19 1:45 AM .
 * Copyright (c) 2019. All right reserved.
 *
 */


class FileCommit extends Entity {

    constructor(id, loadInfos = autoLoadInfo) {
        super(id, loadInfos, "filecommit");
    }

    static entityStringType(){
        return "filecommit";
    }

    /**
     * Return the name of the file commit.
     * @returns {string}
     * @throws InfosNotLoadedException
     */
    get name() {
        return this.genericGetter("_name");
    }

    /**
     * Return the commit ID to the file commit.
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
     * Return the repository ID of the file commit.
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
     * Return the type of the file commit.
     * @returns {string}
     * @throws InfosNotLoadedException
     */
    get type() {
        return this.genericGetter("_type");
    }

    /**
     * Loads all info related to the current file commit :
     * - name
     * - commit ID
     * - repository ID
     * - type
     * @returns {Promise<void>}
     * @throws InfosAlreadyLoadedException if the uml file infos are already loaded
     */
    async loadInfo() {
        if (!this._infoLoaded) {
            let info = await FileCommitWrapper.getInfo(this.id);
            this._name = info[0][dbschema.db.tableContent.filecommit.name];
            this._commitID = info[0][dbschema.db.tableContent.filecommit.commitID];
            this._repositoryID = info[0][dbschema.db.tableContent.filecommit.repositoryID];
            this._type = info[0][dbschema.db.tableContent.filecommit.type];
            this._repositoryID = info[0][dbschema.db.tableContent.filecommit.repositoryID];

            this._infoLoaded = true;
        }
        else {
            throw new InfosAlreadyLoadedException('filecommit');
        }
    }
}

EntityClasses
    .fileCommit = FileCommit;