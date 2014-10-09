var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var todosSchema = new Schema({
    todo: String,
    isCompleted: Boolean
});

var todosModel = mongoose.model('todos', todosSchema);

module.exports = {
    todosModel: todosModel
};