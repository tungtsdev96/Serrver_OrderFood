var tableDao = require("../dao/table-dao.js");
var customerDao = require("../dao/customer-dao.js");
var tableDetailDao = require("../dao/table-detail-dao.js");
var express  = require("express");
var router = express.Router();

function calculateLateTime(order){
    var d = new Date();
    var now = d.getTime();
    var status = order.status;
    var state;
    var lateTime = "";
    if(status == 1){
        state = "WAITING"; 
        var late =  new Date(order.start_time + "").getTime() - now;
        if(late < 0){
            late = 0- late;
            late = Math.round((late / 1000) / 60);
            lateTime = lateTime + "Late " + late + " minutes";
        }else{
            if(late < 16){
                late = Math.round((late / 1000) / 60);
                lateTime = "<b>" + lateTime + "Coming in " + late + " minutes" + "</b>";
            }else{
                late = Math.round((late / 1000) / 60);
                lateTime = lateTime + "Coming in " + late + " minutes";
            }
            
        }
    }
    return lateTime;
}

router.get("/order-table", function(req, res){
    tableDao.getComingOrderTable(req.session.passport.user, function(results){
        var myResult = [];
        results.forEach(function(element){
            var temp = element;
            temp.lateTime = calculateLateTime(element);
            myResult.push(temp);
        });
        res.render("order-table", {orders: myResult});
    });
});

router.get("/order-table-detail", function(req, res){
    var id = req.query.id;
    tableDao.getOrderTable(id, null, null, function(order){
        customerDao.getCustomerById(order[0].customer_id, function(customer){
            tableDetailDao.getTablesInOrder(id, function(tables){
                var d = new Date();
                var now = d.getTime();
                var status = order[0].status;
                var state;
                var lateTime = "";
                if(status == 1){
                    state = "WAITING"; 
                    var late =  new Date(order[0].start_time + "").getTime() - now;
                    if(late > 0){
                        late = Math.round((late / 1000) / 60);
                        lateTime = lateTime + "Late " + late + " minutes";
                    }
                }
                if(status == 2){
                    state = "IN PROGRESS";
                }
                if(status == 3){
                    state = "COMPLETED";
                }
                if(status == 4){
                    state = "CANCELED BY CUSTOMER";
                }
                if(status == 5){
                    state = "CANCELED BY OUT OF TIME";
                }
                var arrTable = "";
                tables.forEach(element => {
                    arrTable = arrTable + element.table_number + ",  "
                });
                arrTable = arrTable.substring(0, arrTable.length - 3);
                console.log({tables: tables, customer : customer, order : order});
                res.render("order-table-detail", {tables: tables, customer : customer, order : order[0], state : state, lateTime : lateTime, arrTable: arrTable});
            });
        });
    }); 
});


router.get("/order-table/update/:status/:orderId", function(req, res){
    var newState = req.params.status;
    var orderId = req.params.orderId;
    tableDao.updateState(orderId, newState, function(resutls){
        res.redirect("http://localhost:3000/order-table");
    })
});
module.exports = router;