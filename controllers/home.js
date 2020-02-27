var express = require('express');
var router = express.Router();
var userModel = require.main.require('./models/userModel');

router.get('*', function(req, res, next){
	if(req.cookies['username'] == null){
		res.redirect('/login');
	}else{
		next();
	}
});

router.get('/', function(req, res){
	userModel.getByUname(req.cookies['username'], function(result){
		res.render('home/index', {user: result});
	});
});

router.get('/viewmember', function(req, res){
	userModel.getByAll(function(results){
		if(results.length > 0){
			res.render('home/vmejs', {userlist: results});
		}else{
			res.redirect('/home');
		}
	})
});

router.get('/delete/:id', function(req, res){

	userModel.delete(req.params.id, function(status){
			if(status){
				res.redirect('/home/viewmember');
			}else{
				res.redirect('/home');
			}
	});
});

//profile
router.get('/prof/:id', function(req, res){

	userModel.prof(req.params.id, function(results){
		if(results.length > 0){
			res.render('home/profile', {user: results});
		}else{
			res.redirect('/home');
		}
	});
});

router.post('/prof/:id', function(req, res){

	var user ={
        username: req.body.uname,
		password: req.body.password,
		id:req.params.id
	  };
	  
	  userModel.update(user, function(status){
        if(status){
            res.redirect('/login');
          }
          else{
              res.redirect('/home');
          }
      });
});

router.get('/viewresturent', function(req, res){
	userModel.getAllrest(function(results){
		if(results.length > 0){
			res.render('home/vres', {vres: results});
		}else{
			res.redirect('/home');
		}
	})
});



module.exports = router;