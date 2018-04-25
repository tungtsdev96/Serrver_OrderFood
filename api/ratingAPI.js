var rateDao = require("../dao/rate-dao.js");
var express = require("express");
var router = express.Router();

router.post("/api/rating/post", function(req, res){
    rateDao.insertNewRate(req.body, function(result){
        res.end(JSON.stringify(result));
    })
});

router.get("/api/rating/get", function(req, res){
    rateDao.getRestaurentRatingAverage(req.query.restaurentId, function(result){
        res.end(JSON.stringify(result));
    });
});

router.get("/api/rating/get-by-customer", function(req, res){
    rateDao.getRate(req.query.customerId, req.query.restaurentId, function(s){
        res.end(JSON.stringify({score : s}));
    });
});



module.exports = router;