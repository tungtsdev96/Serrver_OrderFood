var pool = require("../controller/mysql.js");

var searchDao = {
    getSearchContent: function (customerId, callback) {
        var sql = "SELECT content FROM search WHERE customer_id = " + customerId;
        console.log(sql);
        pool.query(sql, function (error, results) {
            console.log(results);
            if (error) throw error;
            if (results.length > 0) {
                callback(results[0].content);
            } else {
                callback(null);
            }
        });
    },
    addSearchContent: function (customerId, content) {
        var sql = "UPDATE search SET content ='" + content + "' WHERE customer_id = " + customerId ;
        console.log(sql);
            pool.query(sql, function (error, results) {

            });
    }
}

module.exports = searchDao;