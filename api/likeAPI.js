var likeDao = require("../dao/like-dao.js");
var express = require("express");

var router = express.Router();


router.post("/api/like/post-like", function(req, res){
    var customerId = req.body.customerId;
    var productId = req.body.productId;
    likeDao.insertLike(customerId, productId, function(){
        res.sendStatus(200);
    });
});

router.post("/api/like/post-unlike", function(req, res){
    var customerId = req.body.customerId;
    var productId = req.body.productId;
    likeDao.deleteLike(customerId, productId, function(){
        res.sendStatus(200);
    });
});

router.get("/api/like/get-like-by-customer", function(req, res){
    var customerId = req.query.customerId;
    var productId = req.query.productId;
    likeDao.getLikeByCustomer(customerId, productId, function(r){
        res.end(JSON.stringify({like:r}));
    });
});


module.exports = router;
