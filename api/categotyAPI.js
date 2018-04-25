var express = require("express");
var router = express.Router();
var categoryDao = require("../dao/category-dao.js");

router.get("/api/category/system", function(req, res){
    categoryDao.getSystemCategory(function(result){
        res.json(result);
    });
});

router.get("/api/category", function(req, res){
        var restaurentId = req.query.restaurentId;  
        categoryDao.getCategoryByRestaurent(restaurentId, function(result){
            res.json(result);
        });
});

router.get("/api/category/current-restaurent", function(req, res){
    if(req.isAuthenticated()){
        var restaurentId = req.session.passport.user;  
        categoryDao.getCategoryByRestaurent(restaurentId, function(result){
            res.json(result);
        });
    }
    
});

router.get("/api/category/id=:id", function(req, res){
    var categoryId = req.params.id;
    categoryDao.getCategoryById(categoryId, function(result){
        res.json(result[0]);
    });
});

module.exports = router;