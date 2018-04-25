var express = require("express");
var router = express.Router();
var commentDao = require("../dao/comment-dao");

router.post("/api/comment/post", function(req, res){
    var comment = req.body;
    commentDao.addComment(comment, function(result){
        if(result == true){
            res.end(JSON.stringify({state: true}));
        }
    });
});

router.get("/api/comment/get", function(req,res) {
    var restaurentId = req.query.restaurentId;
    var page = req.query.page;
    commentDao.getCommentByRestaurent(restaurentId, page, function(result){
        res.end(JSON.stringify(result));
    });
});

module.exports = router;