/*
 * Developed by Steven BUCAILLE on 1/4/19 2:09 PM.
 * Last modified 12/27/18 5:18 PM .
 * Copyright (c) 2019. All right reserved.
 *
 */

console.log("init");
let dbschema;

autoLoadInfo = false;

EntityInstances = {};

EntityClasses = {};

EntityInstancesProxy = new Proxy(EntityInstances, {
    get(entitiesObject, id) {
        if (entitiesObject[id]) return entitiesObject[id];                                              //If the element is already defined, return it.
        else {
            if(EntityClasses[id]){
                EntityInstances[id] = {
                    type : EntityClasses[id]
                };
                entitiesObject[id] = new Proxy(EntityInstances[id], {
                    get(specifiedEntityObject, id){
                        if (specifiedEntityObject[id]) return specifiedEntityObject[id];                                              //If the element is already defined, return it.
                        else{
                            specifiedEntityObject[id] = new specifiedEntityObject.type(id);
                            return specifiedEntityObject[id];
                        }

                    }
                });
                return entitiesObject[id]
            }
            else throw id + ' is not an EntityClass'
        }
    }
})


async function httpGet(url, argument) {
    const rawResponse = await fetch(url, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(argument)
    });
    return await rawResponse.json()
}

async function getDbSchemaJSON() {
    const rawResponse = await fetch('api/getDBSchemaJSON', {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
        }
    });
    dbschema = await rawResponse.json()
}

let test100Diagrams = async () => {
    let diagrams = [];
    for (let i = 0; i < 100; i++) {
        console.log(i);
        diagrams.push(new Diagram(i));
    }
    return diagrams;
};

getDbSchemaJSON();