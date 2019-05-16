/*
 * Developed by Steven BUCAILLE on 11/26/18 6:58 PM.
 * Last modified 11/24/18 1:43 PM.
 * Copyright (c) 2018. All right reserved.
 *
 */

let knex = require('knex');
let auth = require('../../../auth').mysql;
let dbschema = require('../../../dbschema').db;

let db = require('knex')({
    client: 'mysql',
    connection: {
        host: 'localhost',
        user: auth.user,
        password: auth.password,
        database: auth.dbname
    }
});

let test = async () => {
    let select1 = db
        .select()
        .from(dbschema.tableNames.diagram)
        .innerJoin(dbschema.tableNames.class, function(){
            this.on(dbschema.tableNames.diagram + '.' + dbschema.tableContent.diagram.id,
                '=',
                dbschema.tableNames.class + '.' + dbschema.tableContent.class.diagramID)
                .orOn(dbschema.tableNames.diagram + '.classID',
                    '=',
                    dbschema.tableNames.class + '.' + dbschema.tableContent.class.id)
        });

    console.log(select1.toString());
    let result = await select1;
    console.log(result);
}

let test3 = async () => {
    let select = db.select().from(dbschema.tableNames.diagram);
    select.innerJoin(dbschema.tableNames.class, dbschema.tableNames.diagram + '.' + dbschema.tableContent.diagram.id, dbschema.tableNames.class + '.' + dbschema.tableContent.class.diagramID);
    select.where(dbschema.tableNames.class + '.' + dbschema.tableContent.class.name, 'like', "%product%");

    console.log(select.toString());
    let result = await select;
    console.log(result);
}

let test2 = async () => {
    let select1 = db.select()
        .from('users', 'people')
        .where('users.login', '=', 'people.name');


    console.log(select1.toString());
    let result = await select1;
    console.log(result);
}

// test();

module.exports = {
    "knex": db,
    "dbschema": dbschema
};
