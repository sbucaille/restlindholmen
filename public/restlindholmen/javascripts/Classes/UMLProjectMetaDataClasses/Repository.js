/*
 * Developed by Steven BUCAILLE on 1/4/19 2:18 AM.
 * Last modified 1/4/19 2:18 AM .
 * Copyright (c) 2019. All right reserved.
 *
 */


class Repository extends Entity {

    constructor(id, loadInfos = autoLoadInfo) {
        super(id, loadInfos, "repository");
    }

    static entityStringType(){
        return "repository";
    }

    /**
     * Return the name of the repository.
     * @returns {string}
     * @throws InfosNotLoadedException
     */
    get name() {
        return this.genericGetter("_name");
    }

    /**
     * Return the founder name to the repository.
     * @returns {string}
     * @throws InfosNotLoadedException
     */
    get founder() {
        return this.genericGetter("_founder");
    }

    get founder(){
        return this.genericEntityGetter(this.founder, User);
    }

    /**
     * Return the repository ID of the repository.
     * @returns {string}
     * @throws InfosNotLoadedException
     */
    get url() {
        return this.genericGetter("_url");
    }

    /**
     * Return the number of commits of the repository.
     * @returns {number}
     * @throws InfosNotLoadedException
     */
    get numberOfCommits() {
        return this.genericGetter("_numberOfCommits");
    }

    /**
     * Return the date of the first commit of the repository.
     * @returns {string}
     * @throws InfosNotLoadedException
     */
    get dateFirstCommit() {
        return this.genericGetter("_dateFirstCommit");
    }

    /**
     * Return the date of the last commit of the repository.
     * @returns {string}
     * @throws InfosNotLoadedException
     */
    get dateLastCommit() {
        return this.genericGetter("_dateLastCommit");
    }

    /**
     * Loads all info related to the current repository :
     * - name
     * - founder name
     * - url
     * - number of commits
     * - date of the first commit
     * - date of the last commit
     * @returns {Promise<void>}
     * @throws InfosAlreadyLoadedException if the repository infos are already loaded
     */
    async loadInfo() {
        if (!this._infoLoaded) {
            let info = await RepositoryWrapper.getInfo(this.id);
            this._name = info[0][dbschema.db.tableContent.repository.name];
            this._founder = info[0][dbschema.db.tableContent.repository.founder];
            this._url = info[0][dbschema.db.tableContent.repository.url];
            this._numberOfCommits = info[0][dbschema.db.tableContent.repository.numberOfCommits];
            this._dateFirstCommit = info[0][dbschema.db.tableContent.repository.dateFirstCommit];
            this._dateLastCommit = info[0][dbschema.db.tableContent.repository.dateLastCommit];

            this._infoLoaded = true;
        }
        else {
            throw new InfosAlreadyLoadedException('repository');
        }
    }
}

EntityClasses
    .repository = Repository;