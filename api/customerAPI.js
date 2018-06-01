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

router.get("/api/customer/get", function (req, res) {
    var customerId = req.query.customerId;
    customerDao.getCustomerById(customerId, function (customers) {
        res.end(JSON.stringify(customers));
    });
});


// Get customer by intro key
router.get("/api/customer/get-by-intro-key", function (req, res) {
    var intro_key = req.query.intro_key;
    customerDao.getCustomerByIntroKey(intro_key, function (customer) {
        res.end(JSON.stringify(customer));
    });
});

router.get("/api/customer/update-coin", function (req, res) {
    var customer_id = req.query.customer_id;
    var coin = req.query.coin;
    customerDao.updateCoinForCustomer(customer_id, coin);
    res.end(JSON.stringify({result: "OK"}));
});


router.get("/api/customer/share-facebook", function (req, res) {
    var customer_id = req.query.customer_id;
    customerDao.updateSharedFB(customer_id, function(result){
        res.status(200).end("OK");
    });
});

router.get("/api/customer/input_intro_key", function (req, res) {
    var customer_id = req.query.customer_id;
    var intro_key = req.query.intro_key;
    customerDao.inputIntroKey(customer_id, intro_key, function(result){
        if(result == true){
            res.end(JSON.stringify({result: "OK"}));
        }else{
            res.end(JSON.stringify({result: "FAIL"}));
        }
    })
});


module.exports = router;