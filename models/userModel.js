var db = require('./db');

module.exports ={

    validate: function(user, callback){
        var sql ="SELECT * FROM admin where aname=? and apassword=?";
        db.execute(sql, [user.username, user.password], function(status){
            if(status){
                callback(true);
            }else{
                callback(false);
            }
        });
	},
	getByUname: function(username, callback){
		var sql = "select * from admin where aname=?";
		db.getResults(sql, [username], function(results){
			if(results.length > 0){
				callback(results[0]);
			}else{
				callback(null);
			}
		});
    },
}