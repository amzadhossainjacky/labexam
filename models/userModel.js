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
	getByAll: function(callback){
		var sql = "select * from member";
		db.getResults(sql,null, function(results){
			if(results.length > 0){
				callback(results);
			}else{
				callback(null);
			}
		});
    },
    delete: function(user, callback){
		var sql = "delete from member where id=?";
		db.execute(sql, [user], function(status){
			if(status){
				callback(true);
			}else{
				callback(true);
			}
		});
    },
    prof: function(user, callback){
		var sql = "select * from admin where id=?";
		db.getResults(sql, [user], function(results){
			if(results.length > 0){
				callback(results);
			}else{
				callback(null);
			}
		});
    }
}