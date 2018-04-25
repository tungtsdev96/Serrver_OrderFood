var pool = require("../controller/mysql.js");

var likeDao = {
    insertLike : function(customerId, productId, callback){
        var sql = "INSERT INTO likes(product_id, customer_id) VALUES(" + productId
         +"," + customerId + ");";
         pool.query(sql, function (error, results) {
            if (error) throw error;
            callback(results);
        });
    },

    deleteLike : function(customerId, productId, callback){
        var sql = "DELETE FROM likes WHERE product_id = " + productId + " AND customer_id = " + customerId;
         pool.query(sql, function (error, results) {
            if (error) throw error;
            callback(results);
        });
    }, 

    getLikeByCustomer : function(customerId, productId, callback){
        var sql = "SELECT * FROM likes WHERE product_id = " + productId + " AND customer_id = " + customerId;
        console.log(sql);   
        pool.query(sql, function (error, results) {
           if (error) throw error;
           if(results.length > 0){
            callback(1);
           }else{
            callback(0);
           }
           
       });
    }
}



module.exports = likeDao;