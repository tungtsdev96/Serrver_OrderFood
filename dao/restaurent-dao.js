var pool = require("../controller/mysql.js");

var restaurentDao = {

    getRestaurentById : function(id, callback){
        var sql = "SELECT * FROM restaurent WHERE restaurent_id = " + id;
        pool.query(sql, function (error, results) {
            if(error) throw error;
           callback(results);
        });
    },

    getRestaurent : function(callback){
        pool.query('SELECT * FROM restaurent', function (error, results, fields) {
            if (error) throw error;
            callback(results);
        });
    },

    searchRestaurent : function(id, name, callback){
        var sql = "SELECT * FROM restaurent WHERE";
        if(id != null){
            sql = sql + " restaurent_id = " + id;
        }else{
            sql += " restaurent_name like '%" + name +"%' OR restaurent_address like '%" + name + "%'";
        }
        console.log(sql);
        try {
            pool.query(sql, function (error, results) {
                if (error) throw error;
                callback(results);
            });
        } catch (error) {
            console.log(error);
        }
    }, 

    updateRestaurent : function(id, newRestaurent, callback){
        var sql = "UPDATE restaurent SET restaurent_name = '" + newRestaurent.restaurent_name +"', restaurent_address = '"
        + newRestaurent.restaurent_address +"', restaurent_introduction = '" + newRestaurent.restaurent_introduction 
        + "', restaurent_type = " + newRestaurent.restaurent_type +", restaurent_number_table = " + newRestaurent.restaurent_number_table
         +" WHERE restaurent_id = " + id;
         console.log(sql);
         pool.query(sql, function (error, r2) {
            // res.redirect("/update-restaurent");
            callback(r2);
        });
    },
    filerRestaurent: function(searchContent, filterType, typeOfRestaurent, page,  callback){
        var sql;
        if(filterType == 1){
            sql = "SELECT restaurent.restaurent_id, restaurent.restaurent_name, restaurent.restaurent_address, restaurent.restaurent_type, restaurent.restaurent_image, restaurent.restaurent_introduction, restaurent.restaurent_number_table, restaurent.restaurent_latitude, restaurent.restaurent_longitude "
             + " FROM restaurent, order_product, order_detail "
             + " WHERE restaurent.restaurent_id = order_product.restaurent_id AND order_product.order_id = order_detail.order_id "
              + " AND order_product.order_status = 2 GROUP BY restaurent.restaurent_id ORDER BY sum(order_detail.detail_quantity) DESC";
        }
        else if(filterType == 2){
            sql = "SELECT restaurent.restaurent_id, restaurent.restaurent_name, restaurent.restaurent_address, restaurent.restaurent_type, restaurent.restaurent_image, restaurent.restaurent_introduction, restaurent.restaurent_number_table, restaurent.restaurent_latitude, restaurent.restaurent_longitude "
            + " FROM restaurent "
            + " WHERE restaurent_type = " + typeOfRestaurent;
        }
        var offSet;
        if (page != null) {
            offSet = (parseInt(page) - 1) * 15;
            sql = sql + " LIMIT 15 OFFSET " + offSet;
        }
        console.log(sql);
        pool.query(sql, function (error, results) {
            if (error) throw error;
            callback(results);
        });
    }
}

restaurentDao.filerRestaurent("t", 2, 1, 1, function(results){
    console.log(results);
});

module.exports = restaurentDao;