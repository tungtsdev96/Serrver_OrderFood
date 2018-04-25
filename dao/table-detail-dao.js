var pool = require("../controller/mysql.js");

function addNewOrderTableDetail(orderTableId, detail){
    var sql = "INSERT INTO order_table_detail(order_table_id, table_id, table_number) " ;
    sql = sql + " VALUES("+ orderTableId + "," + detail.table_id + "," + detail.table_number + ");";
    pool.query(sql, function (error, results) {
        if (error) throw error;
    });
}
var tableDetailDao = {
    addManyOrderTableDetail : function(orderTableId, details){
        details.forEach(function(element){
            addNewOrderTableDetail(orderTableId,element);
        });
    },
    getTablesInOrder : function(orderTableId, callback){
        var sql = "SELECT * FROM order_table_detail WHERE  order_table_id = " + orderTableId ;
        pool.query(sql, function (error, results) {
            if (error) throw error;
            callback(results);
        });
    }
}

module.exports = tableDetailDao;