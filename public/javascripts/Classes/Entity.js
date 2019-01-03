/*
 * Developed by Steven BUCAILLE on 12/31/18 1:43 AM.
 * Last modified 12/31/18 1:43 AM .
 * Copyright (c) 2018. All right reserved.
 *
 */



class Entity {
    constructor(id, loadInfos, entityType) {
        this.id = id;
        this._infoLoaded = false;
        this.entityType = entityType;
        if (loadInfos) {
            this.loadInfo();
        }
    }

    genericGetter(parameter) {
        if (this._infoLoaded) {
            return this[parameter];
        }
        else {
            throw new InfosNotLoadedException(this.entityType);
        }
    }

    static setupProxy(receiver, type) {                                                             //Parameters : the object receiver, and the Class of the Entity that will be created.
        return new Proxy(receiver, {                                                                //Instance a new Proxy.
            get(receiver, id) {
                if (receiver[id]) return receiver[id];                                              //If the element is already defined, return it.
                else {                                                                              //Otherwise :
                    if (receiver.areIDLoaded) {                                                     //Check if the ID's have been loaded.
                        if (receiver.idList.length > id) {                                          //Check if the ID provided exists in the list of ID's.
                            receiver[id] = new type(receiver.idList[id], true);                     //Instance new generic type with its ID and the loadInfos parameter to true.
                            return receiver[id];                                                    //Return this new created instance.
                        }
                        else {
                            throw new EntityIndexOutOfRangeException('class', id, 'attributes');
                        }
                    }
                    else {
                        throw new ListOfIDNotLoadedException('attributes');
                    }
                }
            }
        })
    }

    /**
     * Load all IDs of an Entity included in an other Entity. These IDs are stored in the proxy object receiver.
     * @param parameter
     * @returns {Promise<void>}
     */
    async loadEntitiesID(parameter){
        let entityName = parameter.entityName;
        let wrapperFunction = parameter.wrapperFunction;
        if (!this[entityName].areIDLoaded) {                                //Check if the ID's are not already loaded.
            let ids = await wrapperFunction(this.id);                       //Retrieve ID's with the wrapper function.
            if(ids[this.id]){                                               //Check if there are ID's available.
                for (let i = 0; i < ids[this.id].length; i++) {             //Store ID's in the array of the receiver.
                    this[entityName].idList.push(ids[this.id][i].id);
                }
            }
            this[entityName].areIDLoaded = true;                            //Change boolean of IDLoaded status to true.
        }
        else throw new ListOfIDAlreadyLoadedException(entityName);
    }

    static convertVisibility(visibilityString) {
        if(visibilityString) {
            if (visibilityString.toLocaleLowerCase() === 'public') return VISIBILITY.PUBLIC;
            else if (visibilityString.toLocaleLowerCase() === 'protected') return VISIBILITY.PROTECTED;
            else if (visibilityString.toLocaleLowerCase() === 'private') return VISIBILITY.PRIVATE;
        }
        else return null;
    }
}