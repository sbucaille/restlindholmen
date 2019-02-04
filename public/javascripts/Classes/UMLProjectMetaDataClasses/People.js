/*
 * Developed by Steven BUCAILLE on 1/4/19 2:00 AM.
 * Last modified 1/4/19 2:00 AM .
 * Copyright (c) 2019. All right reserved.
 *
 */

class People extends Entity{
    constructor(id, loadInfos = autoLoadInfo){
        super(id, loadInfos, "people");
    }

    static entityStringType(){
        return "people";
    }

    /**
     * Return the name of the people.
     * @returns {string}
     * @throws InfosNotLoadedException
     */
    get name() {
        return this.genericGetter("_name");
    }

    /**
     * Return the email of the people.
     * @returns {string}
     * @throws InfosNotLoadedException
     */
    get email() {
        return this.genericGetter("_email");
    }

    /**
     * Loads all info related to the current people :
     * - name
     * - email
     * @returns {Promise<void>}
     * @throws InfosAlreadyLoadedException if the uml file infos are already loaded
     */
    async loadInfo() {
        if (!this._infoLoaded) {
            let info = await FileCommitWrapper.getInfo(this.id);
            this._name = info[0][dbschema.db.tableContent.people.name];
            this._email = info[0][dbschema.db.tableContent.people.email];

            this._infoLoaded = true;
        }
        else {
            throw new InfosAlreadyLoadedException('people');
        }
    }
}

EntityClasses
    .people = People;