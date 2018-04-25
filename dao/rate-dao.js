var pool = require("../controller/mysql.js");

var rateDao = {
    insertNewRate: function (rating, callback) {
        var sql = "INSERT INTO rating(customer_id, restaurent_id, score) "
            + " VALUES(" + rating.customerId + "," + rating.restaurentId + "," + rating.score + ")";
            console.log(sql);
        pool.query(sql, function (error, results) {
            if (error) throw error;
            callback(results);
        });
    },

    getRestaurentRatingAverage: function (restaurentId, callback) {
        var sql = "SELECT AVG(score) sc FROM rating WHERE restaurent_id = " + restaurentId +" GROUP by restaurent_id";
        console.log(sql);
        pool.query(sql, function (error, results) {
            if (error) throw error;
            callback(results[0]);
        });
    },

    getRate : function(customerId, restaurentId, callback){
        var sql = "SELECT * FROM  rating WHERE restaurent_id = " + restaurentId  +" AND customer_id = " + customerId;
        pool.query(sql, function (error, results) {
            if (error) throw error;
            if(results.length >0){
                callback(results[0].score);
            }else{
                callback(-1);
            }
        });
    }
}

module.exports = rateDao;