var pool = require("../controller/mysql.js");

var commentDao = {
    addComment : function(comment, callback){
        var restaurentId = comment.restaurentId;
        var customerId = comment.customerId;
        var content = comment.content;
        var sql = "INSERT INTO comment(customer_id, restaurent_id, content) " 
         + " VALUES( " + customerId + ", " + restaurentId + ",'" + content + "')";
        console.log(sql);
        pool.query(sql, function (error, results, fields) {
            if (error) throw error;
            callback(true);
        });
    },

    getCommentByRestaurent : function(restaurentId, page, callback){
        var sql = "SELECT customer.customer_id, customer.customer_name, comment.content "
         + " FROM customer, comment "
         + " WHERE customer.customer_id = comment.customer_id AND comment.restaurent_id = " + restaurentId + " ORDER BY comment_id";
         var offSet;
         if (page != null) {
             offSet = (parseInt(page) - 1) * 15;
             sql = sql + " LIMIT 10 OFFSET " + offSet;
         }
         pool.query(sql, function (error, results) {
            if (error) throw error;
            callback(results);
        });
    }
}

module.exports = commentDao;