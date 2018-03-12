const mongoose = require("mongoose");
const conexion = require('../configdb.js');
mongoose.connect(conexion.url);
var Schema = mongoose.Schema;
var email_pattern=[/^[_a-z0-9-]+(.[_a-z0-9-]+)*@[a-z0-9-]+(.[a-z0-9-]+)*(.[a-z]{2,4})$/,'Coloca un correo valido']

var userSchema = new Schema({
	nombre: {type: String,required: "El nombre es obligatorio"},
	correo: {type: String,required: "El correo es obligatorio", match: email_pattern},
	password: {type: String,required: "El password es obligatorio"}
});

User = mongoose.model('User',userSchema);

module.exports = User