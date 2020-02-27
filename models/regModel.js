var db = require('./db');

module.exports ={

	insert: function(user, callback){
		var sql = "insert into member values(?,?,?,?,?,?)";

		db.execute(sql, [null, user.username, user.password,user.address,user.phone, user.email], function(status){
			if(status){
				callback(true);
			}else{
				callback(false);
			}
    });
}
}