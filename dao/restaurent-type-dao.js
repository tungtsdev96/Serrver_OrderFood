var pool = require("../controller/mysql.js");

var restaurentTypeDao = {
    getRestaurentType : function(callback){
        var sql = "SELECT * from restaurent_type";
        pool.query(sql, function (error, results, fields) {
            if (error){
            }
            else{
                callback(results);
            }
        });
    }
}

module.exports = restaurentTypeDao;