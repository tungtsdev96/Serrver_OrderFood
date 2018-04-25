var pool = require("../controller/mysql.js");
var orderDetailDao = require("./order-detail-dao.js");
var moment = require('moment-timezone');
function convertDate(inputDate){
    var format = 'YYYY-MM-DD HH:mm:ss';
    return moment(inputDate, format).tz('Asia/Bangkok').format(format);
}
var oderDao = {
    addOrder: function (order, callback) {
        var deliveryTime = order.deliveryTime;
        var phoneNumber = order.phoneNumber;
        var orderCost = order.orderCost;
        var orderAddress = order.orderAddress;
        var orderDescription = order.orderDescription;
        var customerId = order.customerId;
        var restaurentId = order.restaurentId;
        var orderDetails = order.orderDetails;
        var orderDistance = order.orderDistance;
        var sql = "INSERT INTO order_product(delivery_time, phone_number, order_cost, order_address, order_distance, order_description, customer_id, restaurent_id) "
            + "VALUES('" + deliveryTime + "','" + phoneNumber + "', " + orderCost + ", '" + orderAddress + "', " + orderDistance + ", '" + orderDescription + "',"
            + customerId + "," + restaurentId + ");";
        console.log(sql);
        pool.query(sql, function (error, results) {
            if (error) throw error;
            var orderId = results.insertId;
            orderDetailDao.addManyOrderDetail(orderId, orderDetails);
            callback(orderId);
        });
    },

    getOrder: function (orderId, customerId, page, callback) {
        try {
            var sql = "";
            if (orderId != null) {
                sql = "SELECT * FROM order_product WHERE order_id = " + orderId;
            } else {
                offSet = (parseInt(page) - 1) * 15;
                sql = "SELECT * FROM order_product WHERE customer_id = " + customerId + " ORDER BY order_id DESC LIMIT 15 OFFSET " + offSet;
            }
            console.log(sql);
            pool.query(sql, function (error, results, fields) {
                if (error) throw error;
                console.log(results);
                var myFinalResult = [];
                results.forEach(function(element) {
                    var temp = element;
                    temp.order_time = convertDate(element.order_time);
                    temp.delivery_time = convertDate(element.delivery_time);
                    myFinalResult.push(temp);
                });

                callback(myFinalResult);
            });
        } catch (error) {
            console.log(error);
        }
    },

    getComingOrder: function (restaurentId, callback) {
        try {
            var sql = "";
            sql = "SELECT * FROM order_product WHERE order_status = 0 AND restaurent_id = " + restaurentId + " ORDER BY delivery_time ASC";
            pool.query(sql, function (error, results, fields) {
                if (error) throw error;
                callback(results);
            });
        } catch (error) {
            console.log(error);
        }
    },

    updateOrder: function (orderId, state, callback) {
        var sql = "UPDATE order_product SET order_status = " + state + " WHERE order_id = " + orderId;
        pool.query(sql, function (error, results) {
            if (error) throw error;
            callback(true);
        });
    },

    getOrderByState: function (restaurentId, state, callback) {
        var sql = "SELECT * FROM order_product WHERE restaurent_id = " + restaurentId + " AND order_status =" + state
            + " ORDER BY delivery_time ASC";
        pool.query(sql, function (error, results) {
            if (error) throw error;
            callback(results);
        });
    },

    updateFeedBack: function (order, callback) {
        var sql = "UPDATE order_product set order_feedback = '" + order.feedBack +
            "' WHERE order_id = " + order.orderId;
        pool.query(sql, function (error, results) {
            if (error) throw error;
            callback(true);
        });

    },

    getOrderForCustomerByState: function (state, customerId, page, callback) {
        try {
            var sql = "";
            if (page != null) {
                sql = "SELECT * FROM order_product WHERE customer_id = " + customerId + " AND order_status = " + state + " ORDER BY order_id DESC"  ;
            } else {
                offSet = (parseInt(page) - 1) * 15;
                sql = "SELECT * FROM order_product WHERE customer_id = " + customerId + " AND order_status = " + state + " ORDER BY order_id DESC LIMIT 15 OFFSET " + offSet;
            }
            console.log(sql);
            pool.query(sql, function (error, results, fields) {
                if (error) throw error;
                var myFinalResult = [];
                results.forEach(function(element) {
                    var temp = element;
                    temp.order_time = convertDate(element.order_time);
                    temp.delivery_time = convertDate(element.delivery_time);
                    myFinalResult.push(temp);
                });
                callback(myFinalResult);
            });
        } catch (error) {
            console.log(error);
        }
    }
}


module.exports = oderDao;