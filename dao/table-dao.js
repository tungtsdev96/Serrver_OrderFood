var pool = require("../controller/mysql.js");
var moment = require('moment-timezone');
var tableDetailDao = require("./table-detail-dao.js");

function getNumberTableOfRestaurent(restaurentId, callback) {
    var sql = "SELECT restaurent_number_table FROM restaurent WHERE restaurent_id = " + restaurentId;
    pool.query(sql, function (error, results) {
        if (error) throw error;
        console.log(results);
        callback(results[0].restaurent_number_table);
    });
}


function generateCode() {
    var code = "";
    var arr = [];
    for (var i = 65; i <= 90; i++) {
        arr.push(i);
    }
    for (var i = 97; i <= 122; i++) {
        arr.push(i);
    }
    for (var i = 0; i <= 50; i++) {
        arr.push(i);
    }
    for (var i = 1; i < 8; i++) {
        var index = Math.floor((Math.random() * arr.length));
        if (arr[index] <= 50) {
            code = code + arr[index] % 10 + "";
        } else {
            code = code + String.fromCharCode(arr[index]);
        }
    }
    return code;
}
function convertDate(inputDate) {
    var format = 'YYYY-MM-DD HH:mm:ss';
    return moment(inputDate, format).tz('Asia/Bangkok').format(format);
}
var tableDao = {
    getBlankTable: function (restaurentId, startTime, endTime, callback) {
            var sql = "SELECT restaurent_table.id table_id, restaurent_table.restaurent_id, restaurent_table.table_floor, restaurent_table.table_number ";
            sql += " FROM restaurent_table ";
            sql += " WHERE restaurent_table.restaurent_id = 1  ";
            sql += " AND restaurent_table.id NOT IN ( ";
            sql += " SELECT restaurent_table.id ";
            sql += "  FROM restaurent_table, order_table_detail, order_table ";
            sql += " WHERE restaurent_table.id = order_table_detail.table_id AND order_table.id = order_table_detail.order_table_id AND (order_table.status = 1 OR order_table.status = 2) ";
            sql = sql + " AND ((order_table.start_time <= '" + startTime + "' AND  order_table.end_time >= '" + startTime + "') ";
            sql = sql + " OR (order_table.start_time <= '" + endTime + "' AND  order_table.end_time >= '" + endTime + "') ";
            sql = sql + " OR (order_table.start_time >= '" + startTime + "' AND  order_table.end_time <= '" + endTime + "') ";
            sql = sql + " OR (order_table.start_time <= '" + startTime + "' AND  order_table.end_time >= '" + endTime + "'))) ";
            console.log(sql);
            pool.query(sql, function (error, results) {
                if (error) throw error;
                console.log(results);
                callback(results);
            });
    },

    addNewOrderTable: function (orderTable, callback) {
        var lstDetails = orderTable.details;
        var sql = "INSERT INTO order_table(customer_id, restaurent_id,start_time, end_time, number_people, code) ";
        sql = sql + " VALUES(" + orderTable.customer_id + "," + orderTable.restaurent_id + ",'" + orderTable.start_time + "','" + orderTable.end_time + "'," + orderTable.number_people + ",'" + generateCode() + "');";
        console.log(sql);
        pool.query(sql, function (error, results) {
            if (error) throw error;
            var id = results.insertId;
            tableDetailDao.addManyOrderTableDetail(id, lstDetails);
            callback({ result: id });
        });
    },

    updateState: function (orderId, state, callback) {
        var sql = "UPDATE order_table SET order_table.status = " + state + " WHERE order_table.id = " + orderId;
        pool.query(sql, function (error, results) {
            if (error) throw error;
            console.log(results);
            callback({ state: true });
        });
    },

    getComingOrderTable: function (restaurentId, callback) {
        var sql = "SELECT * FROM order_food.order_table WHERE day(current_timestamp()) = day(order_table.start_time)";
        sql = sql + " AND month(current_timestamp()) = month(order_table.start_time) ";
        sql = sql + " AND year(current_timestamp()) = year(order_table.start_time) ";
        sql = sql + " and restaurent_id =  " + restaurentId;
        sql = sql + " order by order_table.status, start_time ASC";
        pool.query(sql, function (error, results) {
            if (error) throw error;
            // console.log(results);
            callback(results);
        });
    },

    getOrderTable: function (orderId, customerId, state, callback) {
        var sql;
        if (orderId != null) {
            sql = "SELECT * FROM order_table WHERE  id = " + orderId;
        }
        if (customerId != null) {
            if (state == null) {
                sql = "SELECT * FROM order_table WHERE  customer_id = " + customerId;
            } else {
                sql = "SELECT * FROM order_table WHERE  customer_id = " + customerId + " AND order_table.status = " + state;
            }
            sql = sql + "  ORDER BY order_table.id DESC";
        }
        console.log(sql);
        pool.query(sql, function (error, results) {
            if (error) throw error;
            var myFinalResult = [];
            results.forEach(function (element) {
                var temp = element;
                temp.order_time = convertDate(element.order_time);
                temp.start_time = convertDate(element.start_time);
                temp.end_time = convertDate(element.end_time);
                myFinalResult.push(temp);
            });
            callback(myFinalResult);
        });
    },

    getAllTableOfRestaurent : function (restaurentId, callback){
        var sql = "SELECT restaurent_table.id table_id, restaurent_table.restaurent_id, restaurent_table.table_floor, restaurent_table.table_number FROM restaurent_table  WHERE restaurent_table.restaurent_id = " + restaurentId;
        pool.query(sql, function (error, results) {
            if (error) throw error;
            console.log(sql);
            callback(results);
        });
    }


}

// State of order_table
// 1 : dang cho`
// 2 : dang su dung
// 3 : hoan thanh
// 4 : bi huy boi nguoi dung
//5 : bi huy boi cua hang do qua han
module.exports = tableDao;  