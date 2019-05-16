/*
 * Developed by Steven BUCAILLE on 1/3/19 10:35 PM.
 * Last modified 1/3/19 10:35 PM .
 * Copyright (c) 2019. All right reserved.
 *
 */



class Commit extends Entity {

    constructor(id, loadInfos = autoLoadInfo) {
        super(id, loadInfos, "commit");
    }

    static entityStringType(){
        return "commit";
    }

    /**
     * Return the GitHub Commit ID of the commit.
     * @returns {string}
     * @throws InfosNotLoadedException
     */
    get githubCommitID() {
        return this.genericGetter("_githubCommitID");
    }

    /**
     * Return the people ID to the commit.
     * @returns {string}
     * @throws InfosNotLoadedException
     */
    get peopleID() {
        return this.genericGetter("_peopleID");
    }

    get people(){
        return this.genericEntityGetter(this.peopleID, People);
    }

    /**
     * Return the date of the commit.
     * @returns {string}
     * @throws InfosNotLoadedException
     */
    get date() {
        return this.genericGetter("_date");
    }

    /**
     * Return the coChanged of the commit.
     * @returns {string}
     * @throws InfosNotLoadedException
     */
    get coChanged() {
        return this.genericGetter("_coChanged");
    }

    /**
     * Return the repository ID of the commit.
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
     * Loads all info related to the current commit :
     * - GitHub Commit ID
     * - people ID
     * - date
     * - coChanged
     * - repository ID
     * @returns {Promise<void>}
     * @throws InfosAlreadyLoadedException if the uml file infos are already loaded
     */
    async loadInfo() {
        if (!this._infoLoaded) {
            let info = await CommitWrapper.getInfo(this.id);
            this._githubCommitID = info[0][dbschema.db.tableContent.commit.githubCommitID];
            this._peopleID = info[0][dbschema.db.tableContent.commit.peopleID];
            this._date = info[0][dbschema.db.tableContent.commit.date];
            this._coChanged = info[0][dbschema.db.tableContent.commit.coChanged];
            this._repositoryID = info[0][dbschema.db.tableContent.commit.repositoryID];

            this._infoLoaded = true;
        }
        else {
            throw new InfosAlreadyLoadedException('commit');
        }
    }
}

EntityClasses
    .commit = Commit;