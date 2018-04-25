var pool = require("../controller/mysql.js");
var searchDao = require("./search-dao.js");
var productDao = {
    getRecommendedProduct: function (page, customerId, callback) {
        var sql;
        searchDao.getSearchContent(customerId, function (content) {
            if (content != null) {
                sql = "SELECT product.product_id, product.product_name, product.product_image, product.product_description, product.product_price, product.category_id, category.restaurent_id"
                    + " FROM product, category"
                    + " WHERE product.category_id = category.category_id AND product.product_name like '%" + content + "%'";
            } else {
                sql = "SELECT product.product_id, product.product_name, product.product_image, product.product_description, product.product_price, product.category_id , category.restaurent_id "
                    + " FROM product, order_detail, category where product.category_id = category.category_id and"
                    + "  product.product_id = order_detail.product_id group by order_detail.product_id order by sum(detail_quantity)";
            }
            if (page != null) {
                offSet = (parseInt(page) - 1) * 15;
                sql = sql + " LIMIT 15 OFFSET " + offSet;
            }
            pool.query(sql, function (error, r1) {
                if (error) throw error;
                if (r1.length != 0) {
                    callback(r1);
                    return;
                }
            });
            sql = "SELECT product.product_id, product.product_name, product.product_image, product.product_description, product.product_price, product.category_id , category.restaurent_id "
                + " FROM product, order_detail, category where product.category_id = category.category_id and"
                + "  product.product_id = order_detail.product_id group by order_detail.product_id order by sum(detail_quantity)";
            if (page != null) {
                offSet = (parseInt(page) - 1) * 15;
                sql = sql + " LIMIT 15 OFFSET " + offSet;
            }
            pool.query(sql, function (error, r2) {
                if (error) throw error;
                callback(r2);
                return;
            });
        });

    },

    getLastestProduct: function (page, callback) {
        var sql = "SELECT product.product_id, product.product_name, product.product_description, product.product_image, product.product_price, product.category_id, restaurent.restaurent_id "
            + "FROM product, category, restaurent "
            + " WHERE product.category_id = category.category_id AND category.restaurent_id = restaurent.restaurent_id ORDER BY product.product_id DESC"
        try {
            var offSet;
            if (page != null) {
                offSet = (parseInt(page) - 1) * 15;
                sql = sql + " LIMIT 15 OFFSET " + offSet;
            }
            pool.query(sql, function (error, results) {
                if (error) throw error;
                callback(results);
            });
        } catch (error) {

        }
    },

    getBestBuyProduct: function (page, callback) {
        var sql = "SELECT product.product_id, product.product_name, product.product_image, product.product_description, product.product_price, product.category_id, category.restaurent_id "
            + " FROM product, order_detail, category"
            + " where product.product_id = order_detail.product_id and category.category_id = product.category_id group by order_detail.product_id order by sum(detail_quantity)";
        try {
            var offSet;
            if (page != null) {
                offSet = (parseInt(page) - 1) * 15;
                sql = sql + " LIMIT 15 OFFSET " + offSet;
            }
            pool.query(sql, function (error, results) {
                if (error) throw error;
                callback(results);
            });
        } catch (error) {

        }
    },

    getLikeProduct: function (page, customerId, callback) {
        var sql = "SELECT product.product_id, product.product_name, product.product_description, product.product_image, product.product_price, product.category_id, category.restaurent_id"
            + " FROM product, likes, category  "
            + "WHERE category.category_id = product.category_id AND product.product_id = likes.product_id AND likes.customer_id = " + customerId
            + " ORDER BY like_id DESC ";
        try {
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
        } catch (error) {

        }
    },

    getProduct: function (sql, callback) {
        try {
            pool.query(sql, function (error, results, fields) {
                if (error) throw error;
                callback(results);
            });
        } catch (error) {
            console.log(error);
        }
    },

    getProductByCategory: function (id, callback) {
        var sql = "SELECT product.product_id, product.product_name, product.product_description, product.product_image, product.product_price, product.category_id, restaurent.restaurent_id "
            + " FROM product, category, restaurent "
            + " WHERE category.restaurent_id = restaurent.restaurent_id AND category.category_id = product.category_id AND product.category_id = " + id;
        pool.query(sql, function (error, results) {
            if (error) throw error;
            callback(results);
        });
    },

    getProductById: function (id, callback) {
        var sql = "SELECT * FROM product WHERE product_id = " + id;
        pool.query(sql, function (error, results) {
            if (error) throw error;
            console.log(results);
            callback(results);
        });
    },

    updateProduct: function (product, callback) {
        var sql;
        if (product.product_image) {
            sql = "UPDATE product SET product_name = '" + product.product_name + "', "
                + "product_description = '" + product.product_description + "',"
                + " product_image = '" + product.product_image + "',"
                + " product_price = " + product.product_price + ", " +
                " category_id = " + product.product_category +
                " WHERE product_id = " + product.product_id;
        } else {
            sql = "UPDATE product SET product_name = '" + product.product_name + "', "
                + "product_description = '" + product.product_description + "',"
                + " product_price = " + product_price + ", " +
                "category_id = " + product.product_category +
                " WHERE product_id = " + product.product_id;
        }
        console.log(sql);
        pool.query(sql, function (error, results) {
            if (error) throw error;
            callback(results);
        });
    },

    deleteProduct: function (id, callback) {
        var sql = "DELETE FROM product WHERE product_id = " + id;
        pool.query(sql, function (error, results) {
            if (error) throw error;
            callback(results);
        });
    },

    getProductBySystemCategory: function (system_category_id, filter, page, callback) {
        var sql = "SELECT product.product_id, product.product_name, product.product_description, product.product_image, product.product_price, product.category_id, restaurent.restaurent_id "
            + " FROM product, category, restaurent, system_category " +
            "WHERE category.restaurent_id = restaurent.restaurent_id AND category.category_id = product.category_id AND"
            + " category.system_category_id = system_category.id AND  system_category.id = " + system_category_id;
        var optionFilter = "";
        if (filter == 'price-up') {
            optionFilter = " ORDER BY product.product_price ASC ";
        }
        if (filter == 'price-down') {
            optionFilter = " ORDER BY product.product_price DESC ";
        }
        if (filter == 'time-up') {
            optionFilter = " ORDER BY product.product_id ASC ";
        }
        if (filter == 'time-down') {
            optionFilter = " ORDER BY product.product_id DESC ";
        }
        sql += optionFilter;
        var offSet = "";
        if (page != null) {
            offSet = (parseInt(page) - 1) * 15;
            sql = sql + " LIMIT 15 OFFSET " + offSet;
        }
        pool.query(sql, function (error, results) {
            if (error) throw error;
            callback(results);
        });

    },

    getDisplayProductForOrderDetail: function (orderId, callback) {
        var sql = "SELECT product.product_id, product.product_name, product.product_price, order_detail.detail_quantity "
            + " FROM product, order_product, order_detail "
            + " WHERE product.product_id = order_detail.product_id AND order_detail.order_id = order_product.order_id "
            + " AND order_product.order_id = " + orderId;
        pool.query(sql, function (error, results) {
            if (error) throw error;
            callback(results);
        });
    },

    addNewProduct: function (product, callback) {
        var sql = "INSERT INTO product(product_name, product_description,product_image, product_price, category_id) "
            + " VALUES('" + product.product_name + "', '" + product.product_description + "', '" + product.product_image + "'," + product.product_price + ", " + product.product_category + ")";
        console.log(sql);
        pool.query(sql, function (error, results) {
            if (error) throw error;
            callback(results);
        });
    },

    searchProductByName: function (customerId, page, name, filter, callback) {
        var sql = "SELECT product.product_id, product.product_name, product.product_description, product.product_image, product.product_price, product.category_id, restaurent.restaurent_id "
            + " FROM product, category, restaurent, system_category "
            + " WHERE category.restaurent_id = restaurent.restaurent_id AND category.category_id = product.category_id AND product.product_name like '%" + name + "%' GROUP BY product.product_id";
        ;

        searchDao.addSearchContent(customerId, name);
        var optionFilter = "";
        if (filter == 'price-up') {
            optionFilter = " ORDER BY product.product_price ASC ";
        }
        if (filter == 'price-down') {
            optionFilter = " ORDER BY product.product_price DESC ";
        }
        if (filter == 'time-up') {
            optionFilter = " ORDER BY product.product_id ASC ";
        }
        if (filter == 'time-down') {
            optionFilter = " ORDER BY product.product_id DESC ";
        }
        var offSet = "";
        if (page != null) {
            offSet = (parseInt(page) - 1) * 15;
            sql = sql + " LIMIT 15 OFFSET " + offSet;
        }
        console.log(sql);
        pool.query(sql, function (error, results) {
            if (error) throw error;
            callback(results);
        });
    },

    getBestProductOfRestaurent: function (restaurentId, page, callback) {
        var sql = "SELECT order_detail.product_id, product.product_name, product.product_image, product.product_description, product.product_price, product.category_id, category.restaurent_id "
            + " FROM product, order_detail, category"
            + " where category.restaurent_id = " + restaurentId + " AND product.product_id = order_detail.product_id and category.category_id = product.category_id group by order_detail.product_id order by sum(detail_quantity) DESC";
        console.log(sql);
        try {
            var offSet;
            if (page != null) {
                offSet = (parseInt(page) - 1) * 15;
                sql = sql + " LIMIT 15 OFFSET " + offSet;
            }
            pool.query(sql, function (error, results) {
                if (error) throw error;
                callback(results);
            });
        } catch (error) {

        }
    }
}

module.exports = productDao;