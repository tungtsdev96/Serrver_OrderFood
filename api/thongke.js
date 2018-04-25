var express = require("express");
var router = express.Router();
var thongKe = require("../dao/thong-ke-dao.js");



router.get("/api/thong-ke", function(req, res){
    var type = req.query.type;
    var restaurentId= req.session.passport.user;
    thongKe.getData(type, restaurentId, function(data){
        res.end(JSON.stringify(data));
    });
});

module.exports = router;