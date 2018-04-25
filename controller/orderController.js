var orderDao = require("../dao/order-dao.js");
var express  = require("express");
var router = express.Router();

router.get("/order/new-order", function(req, res){
    var restaurentId  = req.session.passport.user;
    orderDao.getComingOrder(restaurentId, function(result){
        res.render("new-order", {newOrders : result, restaurent : req.session.passport.user});
    });
});

router.get("/order/update-status-by-restaurent/:orderId/:state", function(req, res){
    var orderId = req.params.orderId;
    var state = req.params.state;
    orderDao.updateOrder(orderId, state, function(rs){
        res.redirect("http://localhost:3000/order/new-order");
    });
});

router.get("/order/manager", function(req, res){
    res.render("order-manager");
});

router.get("/order/order", function(req, res){
    res.render("order-manager");
});

module.exports = router;