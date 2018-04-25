var express = require("express");
var router = express.Router();
var tableDAO = require("../dao/table-dao.js");
var tableDetailDao = require("../dao/table-detail-dao.js");
var moment = require('moment-timezone');

function checkLateCancel (orderTable){
    var d = new Date();
    var now = d.getTime();
    var status = orderTable.status;
    if(status == 1){
        var late =  new Date(orderTable.start_time + "").getTime() - now;
        if(late <= -21){
            return true;
        }
        return false;
    }
    return false;
}

function convertDate(inputDate){
    var format = 'YYYY-MM-DD HH:mm:ss';
    return moment(inputDate, format).tz('Asia/Bangkok').format(format);
}
router.get("/api/table/blank-table", function(req, res){
    var restaurentId = req.query.restaurentId;
    var endTime = convertDate(new Date(Number(req.query.endTime + ""))); 
    var startTime = convertDate(new Date(Number(req.query.startTime + ""))); 
    tableDAO.getBlankTable(restaurentId, startTime, endTime , function(result){
        res.end(JSON.stringify(result));
    });
});

router.post("/api/table/post", function(req, res){
    tableDAO.addNewOrderTable(req.body, function(result){
        res.end(JSON.stringify(result));
    });
});

router.get("/api/table/get-all", function(req, res){
    tableDAO.getAllTableOfRestaurent(req.query.restaurentId, function(result){
        res.end(JSON.stringify(result));
    });
});

router.get("/api/get/order-table", function(req, res){
    var orderId = req.query.orderId;
    var customerId = req.query.customerId;
    var state = req.query.state;
    tableDAO.getOrderTable(orderId, customerId, state, function(result){
        res.end(JSON.stringify(result));
    });                                   
});

router.get("/api/get/order-table-detail", function(req, res){
    var orderId = req.query.orderId;
    tableDetailDao.getTablesInOrder(orderId, function(result){
        res.end(JSON.stringify(result));
    });                                  
});

router.get("/api/order-table-cancel", function(req, res){
    tableDAO.getComingOrderTable(req.session.passport.user, function(results){
        var myFinalResult = [];
        results.forEach(element => {
            if(checkLateCancel(element)){
                myFinalResult.push(element);
            }
        });
        console.log(myFinalResult);
        if(myFinalResult.length > 0){
            myFinalResult.forEach(function(element){
                tableDAO.updateState(element.id, 5, function(kq){
                    res.end(JSON.stringify(kq));
                }); 
            });
        }else{
            res.end(JSON.stringify({state : true}));
        }
    })                  
});

module.exports = router;
