var express = require("express");
var router = express.Router();
var restaurentDao = require("../dao/restaurent-dao.js");
var categoryDao = require("../dao/category-dao.js");
var restaurentTypeDao = require("../dao/restaurent-type-dao.js");
router.get("/api/restaurent/current-restaurent", function(req, res){
    var id = req.session.passport.user;
    restaurentDao.getRestaurentById(id, function(result){
        res.json(result[0]);
    })
});

router.get("/api/restaurent/get", function(req, res){
    restaurentDao.getRestaurent(function(results){
        res.end(JSON.stringify(results));
    });
});

router.get("/api/restaurent/search", function(req, res){
        var id = req.query.restaurentId;
        var name = req.query.restaurentName;
        restaurentDao.searchRestaurent(id, name,function(result){
            res.end(JSON.stringify(result));
        });

});

router.get("/update-restaurent", function(req, res){
    if(req.isAuthenticated()){
        restaurentDao.getRestaurentById(req.session.passport.user, function(r1){
            restaurentTypeDao.getRestaurentType(function(r2){
                res.render("update", {restaurent : r1[0], type : r2});
            });
        });
    }else{
    }
});

router.post("/update-restaurent", function(req, res){
    if(req.isAuthenticated()){
        var newRestaurent = req.body;
        restaurentDao.updateRestaurent(req.session.passport.user, newRestaurent, function(result){
            if(result){
                res.redirect("/update-restaurent");
            }
        });
        
    }else{
    }
});

router.get("/api/restaurent/filter-restaurent", function(req, res){
    var searchContent = req.query.searchContent;
    var filterType = req.query.filterType;
    var typeOfRestaurent = req.query.typeOfRestaurent;
    var page = req.query.page;
    
    restaurentDao.filerRestaurent(searchContent, filterType, typeOfRestaurent, page, function(results){
        res.end(JSON.stringify(results));
    });
});

router.get("/api/restaurent-type", function(req, res){
    restaurentTypeDao.getRestaurentType(function(result){
        res.end(JSON.stringify(result));
    })
})



module.exports = router;