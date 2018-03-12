function formaterr (err){
	var errores={};
	if(err.errors){
		Object.keys(err.errors).forEach(function (key) {
	        errores[key]={resp:false, mensaje:err.errors[key].message, campo:key};
	   	});
	}
	return errores;
}
module.exports.formaterr = formaterr