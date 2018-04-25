var express = require("express");
var router = express.Router();
var orderDao = require("../dao/order-dao.js");


router.get("/api/order/get", function(req, res){
    var orderId = req.query.orderId;
    var customerId = req.query.customerId;
    var page = req.query.page;
    orderDao.getOrder(orderId, customerId, page, function(results){
        res.end(JSON.stringify(results));
    });
});

router.get("/api/order/getByState", function(req, res){
    var restaurentId = req.session.passport.user;
    var state = req.query.state;

    orderDao.getOrderByState(restaurentId, state, function(results){
        res.end(JSON.stringify(results));
    });
});

router.get("/api/order/coming", function(req, res){
    var restaurentId = req.session.passport.user;
    orderDao.getComingOrder(restaurentId, function(results){
        res.end(JSON.stringify(results));
    });
});

router.post("/api/order/feedback", function(req, res){
    orderDao.updateFeedBack(req.body, function(result){
        if(result == true){
            res.end(JSON.stringify({state:true}));
        }
    });
});

router.get("/api/order/filter", function(req, res){
    orderDao.getOrderForCustomerByState(req.query.state, req.query.customerId, req.query.page, function(results){
        res.end(JSON.stringify(results));
    });
});


// router.post("/api/order/post", function(req, res){
//     var order = req.body;
//     console.log(order);
//     orderDao.addOrder(order, function(oid){
//          res.status(200);
//          res.json({orderId : oid});
         
//     });
// });
module.exports = router;