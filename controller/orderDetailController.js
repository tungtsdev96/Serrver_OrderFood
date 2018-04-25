var orderDao = require("../dao/order-dao.js");
var productDao = require("../dao/product-dao.js");
var express  = require("express");
var router = express.Router();

router.get("/order-detail/detail", function(req, res){
    var orderId = req.query.orderId;
    orderDao.getOrder(orderId, null, null, function(o){
        productDao.getDisplayProductForOrderDetail(orderId, function(products){
            res.render("order-detail", {order : o[0], lstProducts : products});
        });
    });
});

module.exports = router;