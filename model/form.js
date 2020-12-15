var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var formSchema = new Schema({
correo:{type: String,require:true , unique: 1,
    trim: true},
sexo:{type: String,require:true},
sugerencia:{type: String,require:true},

})

module.exports = mongoose.model('Sug', formSchema);