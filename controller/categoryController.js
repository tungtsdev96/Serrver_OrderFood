var express  = require("express");
var router = express.Router();
var restaurentDao = require("../dao/restaurent-dao.js");
var categoryDao = require("../dao/category-dao.js");
router.get("/category", function(req, res){
    if(!req.isAuthenticated()){
        res.render("login");
    }else{
        var restaurentId = req.session.passport.user;
        restaurentDao.getRestaurentById(restaurentId, function(result){
            res.render("categories", result[0]);
        });
    };
});

router.get("/category/update/id=:id", function(req, res){
    if(!req.isAuthenticated()){
        res.render("login");
    }else{
        var categoryId = req.params.id;
        var restaurentId = req.session.passport.user;
        restaurentDao.getRestaurentById(restaurentId, function(restaurents){
            categoryDao.getCategoryById(categoryId, function(categories){
                var data = {restaurent : restaurents[0], category : categories[0]};
                res.render("update-category", data);
            })
        });
    };
});

router.get("/category/delete/id=:id", function(req, res){
    if(!req.isAuthenticated()){
        res.render("login");
    }else{
        var categoryId = req.params.id;
        var restaurentId = req.session.passport.user;
        categoryDao.deleteCategory(categoryId, restaurentId, function(result){
            res.redirect("http://localhost:3000/category");
        });
    };
});



module.exports = router;