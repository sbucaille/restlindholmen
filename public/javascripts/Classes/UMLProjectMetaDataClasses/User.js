/*
 * Developed by Steven BUCAILLE on 1/4/19 2:03 AM.
 * Last modified 1/4/19 2:03 AM .
 * Copyright (c) 2019. All right reserved.
 *
 */


class User extends Entity {
    constructor(id, loadInfos = autoLoadInfo) {
        super(id, loadInfos, "user");
    }

    static entityStringType(){
        return "user";
    }

    /**
     * Return the login of the user.
     * @returns {string}
     * @throws InfosNotLoadedException
     */
    get login() {
        return this.genericGetter("_login");
    }

    /**
     * Return the name of the user.
     * @returns {string}
     * @throws InfosNotLoadedException
     */
    get name() {
        return this.genericGetter("_name");
    }

    /**
     * Return the company of the user.
     * @returns {string}
     * @throws InfosNotLoadedException
     */
    get company() {
        return this.genericGetter("_company");
    }

    /**
     * Return the location of the user.
     * @returns {string}
     * @throws InfosNotLoadedException
     */
    get location() {
        return this.genericGetter("_location");
    }

    /**
     * Return the email of the user.
     * @returns {string}
     * @throws InfosNotLoadedException
     */
    get email() {
        return this.genericGetter("_email");
    }

    /**
     * Return the date of creation of the user.
     * @returns {string}
     * @throws InfosNotLoadedException
     */
    get createdAt() {
        return this.genericGetter("_createdAt");
    }

    /**
     * Return the type of the user.
     * @returns {string}
     * @throws InfosNotLoadedException
     */
    get type() {
        return this.genericGetter("_type");
    }

    /**
     * Return if the user if a fake or not.
     * @returns {boolean}
     * @throws InfosNotLoadedException
     */
    get fake() {
        return this.genericGetter("_fake");
    }

    /**
     * Return the user is deleted or not.
     * @returns {boolean}
     * @throws InfosNotLoadedException
     */
    get deleted() {
        return this.genericGetter("_deleted");
    }

    /**
     * Return the longitude of the user.
     * @returns {string}
     * @throws InfosNotLoadedException
     */
    get longitude() {
        return this.genericGetter("_longitude");
    }

    /**
     * Return the latitude of the user.
     * @returns {string}
     * @throws InfosNotLoadedException
     */
    get latitude() {
        return this.genericGetter("_latitude");
    }

    /**
     * Return the country code of the user.
     * @returns {string}
     * @throws InfosNotLoadedException
     */
    get countryCode() {
        return this.genericGetter("_countryCode");
    }

    /**
     * Return the state where the user lives.
     * @returns {string}
     * @throws InfosNotLoadedException
     */
    get state() {
        return this.genericGetter("_state");
    }

    /**
     * Return the city of the user.
     * @returns {string}
     * @throws InfosNotLoadedException
     */
    get city() {
        return this.genericGetter("_city");
    }

    /**
     * Loads all info related to the current user :
     * - login
     * - name
     * - company
     * - location
     * - email
     * - date of creation
     * - type
     * - fake or not
     * - deleted or not
     * - longitude
     * - latitude
     * - country code
     * - state
     * - city
     * @returns {Promise<void>}
     * @throws InfosAlreadyLoadedException if the uml file infos are already loaded
     */
    async loadInfo() {
        if (!this._infoLoaded) {
            let info = await UserWrapper.getInfo(this.id);
            this._login = info[0][dbschema.db.tableContent.user.login];
            this._name = info[0][dbschema.db.tableContent.user.name];
            this._company = info[0][dbschema.db.tableContent.user.company];
            this._location = info[0][dbschema.db.tableContent.user.location];
            this._email = info[0][dbschema.db.tableContent.user.email];
            this._createdAt = info[0][dbschema.db.tableContent.user.createdAt];
            this._type = info[0][dbschema.db.tableContent.user.type];
            this._fake = info[0][dbschema.db.tableContent.user.fake];
            this._deleted = info[0][dbschema.db.tableContent.user.deleted];
            this._longitude = info[0][dbschema.db.tableContent.user.longitude];
            this._latitude = info[0][dbschema.db.tableContent.user.latitude];
            this._countryCode = info[0][dbschema.db.tableContent.user.countryCode];
            this._state = info[0][dbschema.db.tableContent.user.state];
            this._city = info[0][dbschema.db.tableContent.user.city];

            this._infoLoaded = true;
        }
        else {
            throw new InfosAlreadyLoadedException('user');
        }
    }
}