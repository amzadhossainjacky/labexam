var express = require('express');
var userModel = require.main.require('./models/userModel');
var memberModel = require.main.require('./models/memberModel');
var router = express.Router();

router.get('/',function(req, res){
    res.render('admin/index');
});


router.post('/', function(req, res){

      var user ={
        username: req.body.uname,
        password: req.body.password
      };
        
      if((user.username == "" && user.password=="") || user.username == "" ||user.password==""){
            res.redirect('/login');
      }
      else{
        if(user.username == 'admin'){
            userModel.validate(user, function(status){
                if(status){
                    res.cookie('username', req.body.uname);
                    res.redirect('/home');
                  }
                  else{
                      res.redirect('/login');
                  }
              });
          }else{
    
            memberModel.validate(user, function(status){
                if(status){
                    res.cookie('membername', req.body.uname);
                    res.redirect('/memberhome');
                  }
                  else{
                      res.redirect('/login');
                  }
              });
          }
      }
        

   
});
module.exports = router;