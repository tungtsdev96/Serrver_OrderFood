var pool = require("../controller/mysql.js");
var thongKe = {
    getData: function (type, restaurentId, callback) {
        var sql;
        if (type == 1) {
            sql = "select day(order_product.delivery_time) time, sum(order_product.order_cost) money "
                +   " from order_product "
                + " where order_product.order_status = 2 and week(current_date()) = week(order_product.delivery_time) AND restaurent_id = " + restaurentId
                + " group by day(order_product.delivery_time)"
                + " order by day(order_product.delivery_time) asc ";
        } else if (type == 2) {
            sql = "select week(order_product.delivery_time) time, sum(order_product.order_cost) money"
            + "  from order_product where order_product.order_status = 2 and month(current_date()) = month(order_product.delivery_time) AND restaurent_id = " + restaurentId
             + " group by week(order_product.delivery_time)  order by week(order_product.delivery_time) asc";
        } else if (type == 3) {
            sql = "select month(order_product.delivery_time) time, sum(order_product.order_cost) money"
            + "  from order_product where order_product.order_status = 2 and year(current_date()) = year(order_product.delivery_time) AND restaurent_id = " + restaurentId
             + " group by month(order_product.delivery_time)  order by month(order_product.delivery_time) asc";
        }else if(type == 4){
            sql = "select product.product_name name, sum(order_detail.detail_quantity) y"
            + " from product, order_detail, order_product"
            + "  where product.product_id = order_detail.product_id and order_product.order_id = order_detail.order_id"
            + " and order_product.restaurent_id =" + restaurentId + "  and order_product.order_status = 2 "
            + " group by order_detail.product_id"
            + " order by y DESC limit 10";
        }
        else if(type == 5){
            sql = "select product.product_name name, sum(order_detail.detail_quantity) y"
            + " from product, order_detail, order_product"
            + "  where product.product_id = order_detail.product_id and order_product.order_id = order_detail.order_id"
            + " and order_product.restaurent_id = " + restaurentId + " and order_product.order_status = 2 "
            + " group by order_detail.product_id"
            + " order by y ASC limit 10";
        }
        if(type == 1 || type == 2 || type == 3){
            pool.query(sql, function (error, results) {
                if (error) throw error;
                console.log(results);
                var arrTime = [];
                var arrValue = [];
                results.forEach( function(element) {
                    arrTime.push(element.time);
                    arrValue.push(element.money);
                });
                var data = {time : arrTime, money : arrValue};
                console.log(data);
                callback(data);
            });
        }
        if(type == 4 || type == 5){
            pool.query(sql, function (error, results) {
                if (error) throw error;
                console.log(results);
                var arrName = [];
                var arrQuantity = [];
                results.forEach( function(element) {
                    arrName.push(element.name);
                    arrQuantity.push(element.y);
                });
                var data = {name : arrName, quantity : arrQuantity};
                console.log(data);
                callback(data);
            });
        }

        
    },
    
    thongKeDate : function(start, end, callback){
        var startDay = start.day;
        var startMonth = start.month;
        var startYear = start.year;
        var endDay = end.day;
        var endMonth = end.month;
        var endYear = end.year;
    }
}

module.exports = thongKe;