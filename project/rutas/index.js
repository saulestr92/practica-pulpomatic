const express = require('express');
const router = express.Router();
const User = require('../modelos/usuario.js');
var fomaterr = require('../libs/formaterror.js').formaterr;

router.get('/',(req,res)=>{
	if(!req.session.user_id){
		res.redirect('/login');
	}else{
		res.redirect('/app');
	}	
});

router.get('/logout',(req,res)=>{
	req.session.destroy();
	res.redirect('/login');
});



router.get('/register',(req,res)=>{
	var user = new User({
		correo: '',
		password: '',
		nombre: ''
	});
	res.render('registro',{url:'/register',metodo:'post', user:user});	
});

router.post('/register',(req,res)=>{
	User.findOne({correo:req.body.Correo},function(err,doc){
		var user = new User({
				correo: req.body.Correo,
				password: req.body.Password,
				nombre: req.body.Nombre
			});
		if (doc){
			res.render('registro',{url:'/register',metodo:'post',existe:true, user:user});
		}else{
			user.save(function(err){
				if (err){
					var errores = fomaterr(err);
					res.render('registro',{url:'/register',metodo:'post',error:errores, user:user});
				}else{
					var datos={correo:req.body.Correo, password:'' };
					var resp=2;
					res.render('login',{url:'/login',metodo:'post' , resp:resp ,datos:datos});
				}
			});
		}
	});
});

router.get('/login',(req,res)=>{
	if(req.session.user_id){
		res.redirect('/app');
	}
	var datos={correo:'', password:'' };
	res.render('login',{url:'/login',metodo:'post' ,datos:datos});
});

router.post('/login',(req,res)=>{
	User.findOne({correo: req.body.Correo,password: req.body.Password},(err, user)=>{
		var datos={correo:req.body.Correo, password:req.body.Password };
		if(err){
			var errores = fomaterr(err);
			res.render('login',{url:'/login',metodo:'post' ,error:errores ,datos:datos});
		}
		if(user){
		req.session.user_id = user._id;
		res.redirect('/app');
		}else{
			User.findOne({correo: req.body.Correo},(err, user)=>{
				resp=0;
				if(user){
			        resp=1;
				}
				res.render('login',{url:'/login',metodo:'post' , resp:resp ,datos:datos});
			});
		}
	})
});

module.exports = router;