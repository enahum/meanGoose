(function () {

    'use strict';
    var express = require('express');
    var router = express.Router();
    var mongoose = require('mongoose');
    mongoose.connect('mongodb://localhost/meanApp');
    var db = mongoose.connection;
    var connected = false;
    var error = null;

    mongoose.connection.db.on('reconnect', function (ref) {
        connected = true;
        error = null;
        //console.log('reconnect to mongo server.');
    });

    db.on('open', function (ref) {
        connected = true;
        error = null;
        //console.log('open connection to mongo server.');
    });

    db.on('connected', function (ref) {
        connected = true;
        error = null;
        //console.log('connected to mongo server.');
    });

    db.on('disconnected', function (ref) {
        connected = false;
        error = null;
        //console.log('disconnected from mongo server.');
    });

    db.on('close', function (ref) {
        connected = false;
        error = null;
        //console.log('close connection to mongo server');
    });

    db.on('error', function (err) {
        connected = false;
        //console.log('error connection to mongo server! ' + err);
        error = {
            type: 'MongoDB',
            error: err.message
        };
    });


    /* GET home page. */
    router.get('/', function (req, res) {
        res.render('index');
    });

    router.get('/api/todos', function (req, res) {
        if (!error) {
            mongoose.model('todos').find(function (err, todos) {
                res.json(todos);
            });
        } else
            res.json(error);
    });

    router.post('/api/todos', function (req, res) {
        if (!error) {
            var todosModel = require('../models/todos').todosModel;
            var todo = new todosModel(req.body);
            todo.save(function (err) {
                res.json(todo);
            });  
        } else
            res.json(error);
    });

    router.put('/api/todos', function (req, res) {
        if (!error) {
            var todosModel = require('../models/todos').todosModel;
            var query = { _id: req.body._id }
            todosModel.findOneAndUpdate(query, { isCompleted: req.body.isCompleted, todo: req.body.todo }, function (err, doc) {
                var data = {
                    _id: doc._id,
                    todo: doc.todo,
                    isCompleted: doc.isCompleted,
                    updatedExisting: true
                };
                res.json(data);
            });
        } else
            res.json(error);
    });

    router.delete('/api/todos/:_id', function (req, res) {
        if (!error) {
            var todosModel = require('../models/todos').todosModel;
            var query = { _id: req.params._id }
            todosModel.remove(query, function (err) {
                var data = true;
                res.json(data);
            });
        } else
            res.json(error);
    });

    module.exports = router;

}());