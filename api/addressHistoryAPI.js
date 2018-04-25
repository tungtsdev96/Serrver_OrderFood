var express = require("express");
var router = express.Router();
var addressHistoryDao = require("../dao/address-history-dao.js");

router.get("/api/address-history", function(req, res){
    var customerId = req.query.customerId;
    addressHistoryDao.getAddress(customerId, function(results){
        res.end(JSON.stringify(results));
    });
});

router.post("/api/address-history", function(req, res){
    var addressHistory = req.body;
    addressHistoryDao.addAddress(addressHistory.customerId, addressHistory.address, function(){
        res.end(JSON.stringify({state : true}));
    });
});


module.exports = router;