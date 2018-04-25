var pool = require("../controller/mysql.js");
var adminDao = {
    updateSocket : function(restaurent_id, socketId){
        var sql = "UPDATE admin SET socket_id = '" + socketId + "' WHERE restaurent_id = " + restaurent_id + "";  
        console.log(sql);
        pool.query(sql, function (error, results, fields) {
            if (error){
            }
            else{
                console.log(results);
            }
        });
    },

    getSocketId : function(restaurentId, callback){
        var sql = "SELECT * FROM admin WHERE restaurent_id = " + restaurentId ;  
        console.log(sql);
        pool.query(sql, function (error, results) {
            if (error){
            }
            else{
               callback(results[0].socket_id);
            }
        });
    }

}




module.exports = adminDao;