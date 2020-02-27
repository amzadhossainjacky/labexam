var express = require('express');
var router = express.Router();
var memberModel = require.main.require('./models/memberModel');

router.get('*', function(req, res, next){
	if(req.cookies['membername'] == null){
		res.redirect('/login');
	}else{
		next();
	}
});

router.get('/', function(req, res){
	memberModel.getByUname(req.cookies['membername'], function(result){
		res.render('memberhome/index', {user: result});
	});
});

module.exports = router;