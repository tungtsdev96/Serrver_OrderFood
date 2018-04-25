var productDao = require("../dao/product-dao.js");
var express = require("express");
var router = express.Router();

router.get("/api/product/recommended", function(req, res){
    var page = req.query.page;
    var customerId = req.query.customerId;
    productDao.getRecommendedProduct(page,customerId,  function(results){
        res.end(JSON.stringify(results));
    });
});

router.get("/api/product/lastest", function(req, res){
    var page = req.query.page;
    productDao.getLastestProduct(page, function(results){
        res.end(JSON.stringify(results));
    });
});

router.get("/api/product/like", function(req, res){
    var page = req.query.page;
    var customerId = req.query.customerId;
    productDao.getLikeProduct(page, customerId, function(results){
        res.end(JSON.stringify(results));
    });
});

router.get("/api/product/best-buy", function(req, res){
    var page = req.query.page;
    productDao.getBestBuyProduct(page, function(results){
        res.end(JSON.stringify(results));
    });
});

router.get("/api/product/get", function(req, res){
    var categoryId = req.query.categoryId;
    var productId = req.query.productId;
    var orderId = req.query.orderId;
    var page = req.query.page;
    var sql = "";
    if(productId != null){
        sql = "SELECT product.product_id, product.product_name, product.product_description, product.product_image, product.product_price, product.category_id, restaurent.restaurent_id " +
        "FROM product , category, restaurent "
        + " WHERE category.restaurent_id = restaurent.restaurent_id AND category.category_id = product.category_id AND product.product_id = " + productId; 
    }
    if(categoryId != null && page == null){
        sql = "SELECT product.product_id, product.product_name, product.product_description, product.product_image, product.product_price, product.category_id, restaurent.restaurent_id " +
        "FROM product , category, restaurent "
        + " WHERE category.restaurent_id = restaurent.restaurent_id AND category.category_id = product.category_id AND product.category_id = " + categoryId; 
    }
    if(categoryId != null && page != null){
        offSet = (parseInt(page) - 1) * 15;
        sql = "SELECT product.product_id, product.product_name, product.product_description, product.product_image, product.product_price, product.category_id, restaurent.restaurent_id " +
        "FROM product , category, restaurent "
        + " WHERE category.restaurent_id = restaurent.restaurent_id AND category.category_id = product.category_id AND product.category_id = " + categoryId; 
        + " LIMIT 15 OFFSET " + offSet;;
    }
    if(orderId != null){
        sql = "SELECT product.product_id, product.product_name, product.product_description, product.product_image, product.product_price, product.category_id, restaurent.restaurent_id, order_detail.detail_quantity "
        + " FROM product, order_detail , restaurent , category " +
        " WHERE category.restaurent_id = restaurent.restaurent_id AND category.category_id = product.category_id AND product.product_id = order_detail.product_id AND order_detail.order_id = " + orderId; 
    }
    console.log(sql);
    productDao.getProduct(sql, function(results){
        res.end(JSON.stringify(results));
    });
});

router.get("/api/product/system_category", function(req, res){
    productDao.getProductBySystemCategory(req.query.systemCategoryId, req.query.filter, req.query.page , function(result){
        res.end(JSON.stringify(result));
    });
});

router.get("/api/product/search-by-name", function(req, res){
    var customerId = req.query.customerId;
    var page = req.query.page;
    var name = req.query.name;
    var filter = req.query.filter;
    productDao.searchProductByName(customerId, page, name,filter,  function(result){
        res.end(JSON.stringify(result));
    });
});

router.get("/api/product/getBestByRestaurent", function(req, res){
    var restaurentId = req.query.restaurentId;
    var page = req.query.page;
    productDao.getBestProductOfRestaurent(restaurentId, page,  function(result){
        res.end(JSON.stringify(result));
    });
});



module.exports = router;