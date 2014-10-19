(function(){
    'use strict';
    var mongoose = require('mongoose');
    var todosSchema = new mongoose.Schema({
        todo: String,
        isCompleted: Boolean
    });

    var todosModel = mongoose.model('todos', todosSchema);
    

    module.exports = todosModel;
})();