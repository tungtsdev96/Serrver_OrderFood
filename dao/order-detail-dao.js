var pool = require("../controller/mysql.js");

function addOrderDetail(id , orderDetail){
    var orderId = id;
    var productId = orderDetail.product_id;
    var quantity = orderDetail.detail_quantity;
    var sql = "INSERT INTO order_detail(order_id, product_id, detail_quantity) "
    + " VALUES(" + orderId + "," + productId + "," + quantity +");"; 
    console.log(sql);
    try {
        pool.query(sql, function (error, results) {
            if (error) throw error;
        });
    } catch (error) {
        console.log(error); 
    }
};

var orderDetailDao  = {
    addManyOrderDetail : function(id, order_details){
        if(order_details.length == 0){
            return;
        }
        order_details.forEach(function(order_detail) {
            addOrderDetail(id, order_detail);
        });
    },

    getOrderDetails : function(orderId, callback){
        var sql = "SELECT product_name, detail_quantity FROM product, order_detail "
         + "WHERE product.product_id = oder_detail.product_id AND order_id = " + orderId;
         pool.query(sql, function (error, results) {
            if (error) throw error;
            callback(results);
        });
    },

    
}

module.exports = orderDetailDao;