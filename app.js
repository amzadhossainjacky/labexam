//declaration
var express = require('express');
var mysql = require('mysql');
var ejs = require('ejs');
var expressSession = require('express-session');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var login = require('./controllers/login');
var home = require('./controllers/home');
var logout= require('./controllers/logout');

var memberhome= require('./controllers/memberhome');

var app = express();

///configuration
app.set('view engine', 'ejs');

//middleware
app.use(bodyParser.urlencoded({extended:true}));
app.use(cookieParser());


app.use('/login',login);
app.use('/home',home);
app.use('/logout',logout);



app.use('/memberhome',memberhome);
app.use('/assets', express.static('assets'));


///routers
app.get('/', function(req, res){
    res.render('index');
});

app.get('/registration', function(req, res){
    res.render('registration');
});

var regModel = require.main.require('./models/regModel');
app.post('/registration', function(req, res){
    var user ={
        username: req.body.mname,
        password: req.body.mpassword,
        email: req.body.memail,
        address: req.body.maddress,
        phone: req.body.mphone
      };

      regModel.insert(user, function(status){
        if(status){
            res.redirect('/login');
          }
          else{
              res.redirect('/registration');
          }
      });
});



//server setup

app.listen('3000', function(req, res){
    console.log('server started at 3000!');
})

