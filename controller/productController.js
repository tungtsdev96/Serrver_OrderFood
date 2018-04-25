var express  = require("express");
var router = express.Router();
var restaurentDao = require("../dao/restaurent-dao.js");
var productDao = require("../dao/product-dao.js");
router.get("/products", function(req, res){
    if(!req.isAuthenticated()){
        res.render("login");
    }else{
        var restaurentId = req.session.passport.user;
        restaurentDao.getRestaurentById(restaurentId, function(result){
            res.render("products", result[0]);
            
        });
    };
    
});

router.get("/product/update/id=:id", function(req, res){
    var id = req.params.id;
    if(req.isAuthenticated()){
        if(id != null){
            var sql = "SELECT * FROM category WHERE restaurent_id = " + req.session.passport.user + "";
            productDao.getProductById(id, function(product_results){
               restaurentDao.getRestaurentById(req.session.passport.user, function(restaurent_result){
                res.render("update-product", {restaurent : restaurent_result[0], product : product_results[0], type : "Update"});
               })
            });
        }
    }else{
        res.redirect("/login");
    }
});

router.get("/product/add-product", function(req, res){
    if(req.isAuthenticated()){
        res.render("add-product");
    }else{
        res.redirect("/login");
    }
});


router.post("/product/update-product", function(req, res){
    var newProduct = req.body;
    var avatar;    
    if(req.files.product_image){
        console.log(req.files);
        var file = req.files.product_image;
        var name = file.name;
        var hauTo = file.name.length - 1;
        for(index = name.length - 1; index > 0; index --){
            if(name[index] == '.'){
                break;
            }
        }
        hauTo = name.substring(index, name.length);
        avatar = Date.now() + hauTo;
        file.mv("./public/upload/" + avatar, function(err){
            if(err){
                console.log(err);
            }else{
            }
        });
    }else{
    }
    newProduct.product_image = "http://localhost:3000/upload/" + avatar;
    console.log(newProduct);
    productDao.updateProduct(newProduct, function(results){
        res.redirect("http://localhost:3000/products");
    });
});

router.post("/product/add-product", function(req, res){
    var newProduct = req.body;
    var avatar;    
    if(req.files.product_image){
        console.log(req.files);
        var file = req.files.product_image;
        var name = file.name;
        var hauTo = file.name.length - 1;
        for(index = name.length - 1; index > 0; index --){
            if(name[index] == '.'){
                break;
            }
        }
        hauTo = name.substring(index, name.length);
        avatar = Date.now() + hauTo;
        file.mv("./public/upload/" + avatar, function(err){
            if(err){
                console.log(err);
            }else{
            }
        });
        newProduct.product_image = "http://localhost:3000/upload/" + avatar;
    }else{
    }
    
    console.log(newProduct);
    productDao.addNewProduct(newProduct, function(results){
        res.redirect("http://localhost:3000/products");
    });
});

module.exports = router;