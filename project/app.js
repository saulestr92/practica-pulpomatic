const express = require('express');
const logger = require('morgan');
const bodyParser= require('body-parser'); 
const path = require('path');
const app = express();
const session = require('express-session');
const sesion_midd = require('./middlewares/sesion.js');

const Routes = require('./rutas/index.js');
const Routes_app = require('./rutas/app.js');

app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'vistas'));
app.set('view engine', 'jade');
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
	secret:"abc123#$%",
	resave: false,
	saveUninitialized: false
}))

app.use(bodyParser.urlencoded({extended: true}));
app.use('/',Routes);
app.use('/app',sesion_midd);
app.use('/app',Routes_app);

app.listen(app.get('port'),()=>{
	console.log('puerto del servidor ', app.get('port'));
});

