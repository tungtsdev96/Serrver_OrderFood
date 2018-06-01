var pool = require("../controller/mysql.js");
var randomString = require("randomstring");
function getCustomerByUsername(username, callback) {
    var sql = "SELECT * FROM customer WHERE username = '" + username + "'";
    pool.query(sql, function (error, results) {
        callback(results);
    });
}

var customerDAO = {
    getCustomerById: function (id, callback) {
        var sql = "SELECT * FROM customer WHERE customer_id = '" + id + "'";
        console.log(sql);
        pool.query(sql, function (error, results) {
            console.log(results);
            callback(results[0]);
        });
    },

    getLoginCustomer: function (username, password, callback) {
        var sql = "SELECT * FROM customer WHERE username = '" + username + "' AND password ='" + password + "'";
        pool.query(sql, function (error, results) {
            console.log(results);
            callback(results);
        });
    },

    register: function (customer, callback) {
        console.log(customer);
        var username = customer.username;
        var password = customer.password;
        var firstName = customer.customer_first_name;
        var lastName = customer.customer_last_name;
        var name = customer.customer_name;
        var phone = customer.customer_phone;
        var email = customer.customer_email;
        var introKey = randomString.generate(10).toUpperCase();

        getCustomerByUsername(username, function (results) {
            if (results.length == 0) {
                var sql2 = "INSERT INTO customer(username, password, customer_first_name, customer_last_name, customer_name, customer_phone, customer_email, intro_key)"
                    + " VALUES('" + username + "','" + password + "','" + firstName + "','" + lastName + "','" + name + "','" + phone
                    + "','" + email + "','" + introKey + "');";
                console.log(sql2);
                pool.query(sql2, function (error, result) {
                    console.log(result);
                    callback(result.insertId);
                });
            }
            else {
                callback(null);
            }
        });

    },

    updateSharedFB: function (customerId,callback) {
        var sql = "UPDATE customer SET shared = 1  WHERE customer_id = " + customerId;
        console.log(sql);
        pool.query(sql, function (error, results) {
            if(!error){
                updateCoinForCustomer(customerId, 10);
                callback(true);
            }else{
                callback(false)
            }
        });
    },

    inputIntroKey : function(customerId, introKey,callback){
        getCustomerByIntroKey(introKey, function(customer){
            if(customer != null){
                updateCoinForCustomer(customerId, 10);
                updateCoinForCustomer(customer.customer_id, 10);
                callback(true);
            }else{
                callback(false);
            }
        })
    },

    updateCoinForCustomer : function(customerId, number) {
        var sql = "UPDATE customer SET coin = coin + " + number + "  WHERE customer_id = " + customerId;
        console.log(sql);
        pool.query(sql, function (error, results) {
            console.log(results);
        });
    }

}

function  updateCoinForCustomer(customerId, number) {
    var sql = "UPDATE customer SET coin = coin + " + number + "  WHERE customer_id = " + customerId;
    console.log(sql);
    pool.query(sql, function (error, results) {
        console.log(results);
    });
}


function getCustomerByIntroKey (introKey, callback) {
    var sql = "SELECT * FROM customer WHERE intro_key = '" + introKey + "'";
    console.log(sql);
    pool.query(sql, function (error, results) {
        console.log(results);
        if(results.length > 0){
            callback(results[0]);
        }else{
            callback(null);
        }
        
    });
}

module.exports = customerDAO;