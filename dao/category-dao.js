var pool = require("../controller/mysql.js");

var categoryDao = {
    
    getSystemCategory : function(callback){
        var sql = "SELECT * FROM system_category";
        try {
            pool.query(sql, function (error, results, fields) {
                if (error) throw error;
                callback(results);
            });
        } catch (error) {
            
        }
    },

    getCategoryByRestaurent : function(restaurentId, callback){
        var sql = "SELECT * FROM category WHERE restaurent_id = " + restaurentId;
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

    getCategoryById : function(id, callback){
        var sql = "SELECT * FROM category WHERE category_id = " + id;
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

    deleteCategory : function(catID, resID, callback){
        var sql = "DELETE FROM category WhERE category_id = " + catID + " AND restaurent_id = " + resID;
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

    updateCategory : function( category){
        console.log(category);
        var sql = "UPDATE categoy SET category_name =" + category.category_name + " , category_description = "
            + category.category_description + ", system_category_id = " + category.system_category_id  + 
            " WHERE category_id "  + category.category_id;
    }




}

module.exports = categoryDao;