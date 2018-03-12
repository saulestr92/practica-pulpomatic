const express = require('express');
const router = express.Router();
const User = require('../modelos/usuario.js');
var fomaterr = require('../libs/formaterror.js').formaterr;

router.get('/',(req,res)=>{
		res.render('app');	
});

module.exports = router;