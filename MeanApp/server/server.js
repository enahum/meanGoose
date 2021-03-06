﻿(function () {
    'use strict';

    var express = require('express');
    var path = require('path');
    var fs = require('fs');
    var logger = require('morgan');
    var cookieParser = require('cookie-parser');
    var bodyParser = require('body-parser');
    fs.readdirSync(__dirname + '/models').forEach(function (filename) {
        if (~filename.indexOf('.js')) require(__dirname + '/models/' + filename);
    });
    
    var routes = require('./routes/index');

    fs.readdirSync(__dirname + '/routes/api').forEach(function (filename) {
        if (~filename.indexOf('.js')) require(__dirname + '/routes/api/' + filename);
    });

    var app = express();

    // view engine setup
    app.set('views', path.join(__dirname, 'views'));
    app.engine('html', require('ejs').renderFile);
    app.set('view engine', 'html');

    app.use(logger('dev'));
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({
        extended: true
    }));
    app.use(cookieParser());

    app.use(express.static(path.join(__dirname, '../client')));

    app.use('/', routes);

    app.set('port', process.env.PORT || 3000);

    var server = app.listen(app.get('port'), function () {
        console.log('Express server listening on port ' + server.address().port);
    });

    module.exports = app;
}());