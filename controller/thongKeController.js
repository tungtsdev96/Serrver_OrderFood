var express  = require("express");
var router = express.Router();

router.get("/thong-ke-tien", function(req, res){
    res.render("thongke_tien");
});


router.get("/thong-ke-product", function(req, res){
    res.render("thongke_product");
});

router.get("/thong-ke-date", function(req, res){
    res.render("thongke-date");
})


module.exports = router;