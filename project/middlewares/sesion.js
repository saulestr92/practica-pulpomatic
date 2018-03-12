const User = require('../modelos/usuario.js');

module.exports = function(req,res,next){
	if(!req.session.user_id){
		res.redirect('/login');
	}else{
		User.findById(req.session.user_id,(err,user)=>{
			if(err){
				console.log(err);
				res.redirect('/login');
			}else{
				res.locals.usuario =  user ;
				next();
			}
		})
	}
}