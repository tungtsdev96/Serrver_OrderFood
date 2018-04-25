var pool = require("../controller/mysql.js");

var addressDao = {

    getAddress: function (customerId, callback) {
        var sql = "SELECT * FROM address WHERE customer_id = " + customerId;
        pool.query(sql, function (error, results) {
            if (error) {
            }
            else {
                callback(results);
            }
        });
    },

    addAddress: function (customerId, address, callback) {
        var sql = "INSERT INTO address(customer_id, address) VALUES(" + customerId + ",'" + address + "')";
        pool.query(sql, function (error, results) {
            callback(true);
        });
    }

}

module.exports = addressDao;