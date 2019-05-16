/*
 * Developed by Steven BUCAILLE on 2/10/19 11:21 AM.
 * Last modified 2/10/19 11:14 AM .
 * Copyright (c) 2019. All right reserved.
 *
 */

let express = require('express');
let router = express.Router();

let lindholmenPath = 'restlindholmen/';

let rs = {
    RestLindholmen: 'RestLindholmen',
    DataBase: 'Database',
    RestAPI: 'RestAPI',
    FrontEndInterface: 'Front-End Interface',
};

let restApi = require('./RestAPI/restApi');
router.use('/api', restApi);

/* GET home page. */
router.get('/', function (req, res) {
    rs.title = 'RestLindholmen';
    res.render(lindholmenPath + 'restlindholmen', rs);
});

router.get('/database', (req, res) => {
    rs.title = 'Lindholmen Database';
    rs.database = {
        dbschemaImage: 'images/databaseSchema.png'
    };
    res.render(lindholmenPath + 'databaseDoc', rs);
});

router.get('/restapi', (req, res) => {
    rs.title = 'Lindholmen RestAPI';
    rs.restApi = {
        pathModelisation:               'images/pathModelisation.png',
        classBefore:                    'images/restAPIDoc/classBefore.png',
        classThen:                      'images/restAPIDoc/classThen.png',
        otherEntitiesThen:              'images/restAPIDoc/otherEntitiesThen.png',
        filterObject:                   'images/restAPIDoc/filterObject.png',
        diagramsListFiltered:           'images/restAPIDoc/diagramsListFiltered.png',
        fwDiagramFromClass:             'images/restAPIDoc/fwDiagramFromClass.png',
        fwmethodParamFromMethod:        'images/restAPIDoc/fwmethodParamFromMethod.png',
        attributeNameCounterQuery :     'images/restAPIDoc/attributeNameCounterQuery.png',
        attributeNameCounterResult :    'images/restAPIDoc/attributeNameCounterResult.png',
    };
    res.render(lindholmenPath + 'restApiDoc', rs);
});

router.get('/frontEndInterface', (req, res) => {
    rs.title = 'Front-End Interface';
    rs.frontEndInterface = {
        dbschemaImage:          'images/databaseSchema.png',
        UMLEntity:              'images/UMLEntity.png',
        UMLDiagram:             'images/UMLDiagram.png',
        UMLClass:               'images/UMLClass.png',
        UMLAttribute:           'images/UMLAttribute.png',
        UMLMethod:              'images/UMLMethod.png',
        UMLMethodParam:         'images/UMLMethodParam.png',
        UMLAssociation:         'images/UMLAssociation.png',
        UMLAssociationEnd:      'images/UMLAssociationEnd.png',
        UMLDependency:          'images/UMLDependency.png',
        UMLGeneralization:      'images/UMLGeneralization.png',
        UMLRealization:         'images/UMLRealization.png',
        UMLUMLFile:             'images/UMLGeneralization.png'
    };
    rs.jsExamples = {
        autoLoadInfoTrue :      'images/jsExamples/autoLoadInfoTrue.png',
        instanceClass :         'images/jsExamples/instanceClass.png',
        retrieveRepos :         'images/jsExamples/retrieveRepos.png',
        entityInstancesProxy :  'images/jsExamples/entityInstancesProxy.png',
        hundredClassNames :     'images/jsExamples/hundredClassNames.png',
        attributeNameCounter :  'images/jsExamples/attributeNameCounter.png'
    }
    res.render(lindholmenPath + 'frontEndInterfaceDoc', rs);
});

router.get('/home', (req, res) => {
    res.render('index');
});

module.exports = router;
