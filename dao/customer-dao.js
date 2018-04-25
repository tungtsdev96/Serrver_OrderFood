var pool = require("../controller/mysql.js");

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
        var username = customer.username;
        var password = customer.password;
        var firstName = customer.firstName;
        var lastName = customer.lastName;
        var name = customer.name;
        var phone = customer.phone;
        var email = customer.email;
        getCustomerByUsername(username, function (results) {
            if (results.length == 0) {
                var sql2 = "INSERT INTO customer(username, password, customer_first_name, customer_last_name, customer_name, customer_phone, customer_email)"
                    + " VALUES('" + username + "','" + password + "','" + firstName + "','" + lastName + "','" + name + "','" + phone
                    + "','" + email + "');";
                console.log(sql2);
                pool.query(sql2, function (error, result) {
                    console.log(result);
                    callback(result.insertId);
                });
            }
            else{
                callback(0);
            }
        });

    },




}

module.exports = customerDAO;