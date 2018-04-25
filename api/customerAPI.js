var express = require("express");
var router = express.Router();
var customerDao = require("../dao/customer-dao.js");

router.get("/api/customer", function (req, res) {
    var id = req.query.id;
    customerDao.getCustomerById(id, function (results) {
        res.end(JSON.stringify(results));
    });
});


router.post("/api/customer/register", function (req, res) {
    var customer = req.body;
    customerDao.register(customer, function (id) {
        res.end(JSON.stringify({ customerId: id }));
    });
});

router.post("/api/customer/login", function (req, res) {
    var customer = req.body;
    customerDao.getLoginCustomer(customer.username, customer.password, function (results) {
        res.end(JSON.stringify(results));
    });
});

router.get("/api/customer/get", function () {
    var customerId = req.query.customerId;
    customerDao.getCustomerById(customerId, function (customers) {
        res.end(JSON.stringify(customers));
    });
});

module.exports = router;