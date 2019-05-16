/*
 * Developed by Steven BUCAILLE on 2/10/19 11:19 AM.
 * Last modified 2/10/19 11:19 AM .
 * Copyright (c) 2019. All right reserved.
 *
 */

let express = require('express');
let router = express.Router();

let mePath = 'me/';

let rs = {
    title: 'Experiences',
    Cognifier: 'Cognifier',
    SensorView: 'SensorView'
};

router.get('/', function (req, res) {
    res.render(mePath + 'me', rs);
});

router.get('/cognifier', (req, res) => {
    rs.screenshot = 'images/cognifier/screenshot.png';
    res.render(mePath + 'cognifier/cognifier', rs)
});

router.get('/cognifierapp', (req, res) => {
    rs.c = {
        bootstrapmin: 'libs/bootstrap-3.3.2-dist/css/bootstrap.min.css',
        bootstrapthememin: 'libs/bootstrap-3.3.2-dist/css/bootstrap-theme.min.css',
        diagramCss: 'css/diagram.css',
        indexMaquetteCss: 'css/indexMaquette.css',
        jquery: 'libs/jquery/jquery-3.0.0.js',
        bootstrapminjs: 'libs/bootstrap-3.3.2-dist/js/bootstrap.min.js',
        gojs: 'libs/GoJS/go-debug.js',
        addFile: 'images/addFile.png',
        saveAs: 'images/saveAs.png',
        toJSON: 'images/toJson.png',
    };
    rs.c.jsObj = [
        'js/Classes/Classe.js',
        'js/Classes/Attribute.js',
        'js/Classes/Operation.js',
        'js/Classes/Package.js',
        'js/Classes/PrimitiveType.js',
        'js/functionsMapping.js',
        'js/functionsAddLegend.js',
        'js/traiterXMIObjets.js',
        'js/traiterXMIRelations.js',
        'js/assemblage.js',
        'js/diagram3.js',
        'js/jSonDiag.js',
        'js/mapping.js',
        'js/Objets/colors.js',
        'js/Objets/domHelp.js',
        'js/Objets/strategies.js',
        'js/Objets/decorateDiagrams.js',
        'js/Objets/backgroundColor.js',
        'js/Objets/distance.js',
        'js/Objets/visibility.js',
        'js/Objets/strokeLineSize.js',
        'js/Objets/strokeSize.js',
        'js/Objets/borderColor.js',
        'js/Objets/textColor.js',
        'js/Objets/textStyle.js',
        'js/Objets/textUnderline.js',
        'js/Objets/borderDistance.js',
        'js/Objets/lineColor.js',
        'js/Objets/lineDistance.js',
        'js/Objets/Orientation.js',
        'js/Objets/textSize.js',
        'js/Objets/zoom.js',
    ];
    res.render(mePath + 'cognifier/cognifierapp/index', rs);
});

router.get('/sensorview', (req, res) => {
    rs.sensorViewSchema = 'images/sensorview/sensorview.png';
    rs.totemPhoto = 'images/sensorview/totemPhoto.png';
    rs.connectedTable1 = 'images/sensorview/connectedTable1.jpg';
    rs.connectedTable2 = 'images/sensorview/connectedTable2.jpg';
    rs.qarpediem1 = 'images/sensorview/qarpediem1.jpg';
    rs.qarpediem2 = 'images/sensorview/qarpediem2.jpg';
    rs.grafana = 'images/sensorview/grafana.png';
    rs.grafanahall = 'images/sensorview/grafanahall.png';
    res.render(mePath + 'sensorview/sensorview', rs);
})


module.exports = router;
