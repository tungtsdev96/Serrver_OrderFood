var express = require("express");
var app = express();
var upload = require("express-fileupload");
var pool = require("./controller/mysql.js");
var server = require("http").Server(app);
var io = require("socket.io")(server);
const bodyParser = require('body-parser');
session = require("express-session")({
    secret: "my-secret",
    resave: true,
    saveUninitialized: true
});
var router = express.Router();
var orderDao = require("./dao/order-dao.js");
var restaurentAPI = require("./api/restaurentAPI.js");
var customerAPI = require("./api/customerAPI.js");
var categoryAPI = require("./api/categotyAPI.js");
var productAPI = require("./api/productAPI.js");
var orderAPI = require("./api/orderAPI.js");
var rateAPI = require("./api/ratingAPI.js");
var commentAPI = require("./api/commentAPI.js");
var tableAPI = require("./api/tableAPI.js");
var thongKe = require("./api/thongke.js");
var sharedsession = require("express-socket.io-session");
var adminDao = require("./dao/admin-dao.js");
var messageController = require("./controller/messageController.js");
var thongKeController = require("./controller/thongKeController.js")
var orderTableController = require("./controller/orderTableController.js")
// var productController = require("./controller/productController.js");
// var restaurentController = require("./controller/restaurent.js");
// var orderController = require("./controller/order.js");
// var orderDetailController = require("./controller/order-detail.js");
// var messageController = require("./controller/message.js")
var Passport = require("./controller/passport.js");


io.use(sharedsession(session));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(session);
app.use(upload());
app.use(express.static("public"));
app.set("view engine", "ejs");
app.set("views", "./views");
app.use(bodyParser.json());
app.use(Passport.initialize());
app.use(Passport.session());
server.listen(3000);

app.use("/", orderTableController);
app.use("/", tableAPI);
app.use("/", rateAPI);
app.use("/", thongKeController);
app.use("/", thongKe);
app.use("/", commentAPI);
app.use("/", restaurentAPI);
app.use("/", customerAPI);
app.use("/", categoryAPI);
app.use("/", productAPI);
app.use("/", orderAPI);

//---------------------------- ROUTE FOR VIEW-----------------------------------------------------

app.route("/login").
get(function(req, res){
    res.render("login");
}).post(Passport.authenticate('local', {failureRedirect : "/login", successRedirect : "/products"}));
app.get("", function(req, res){
   res.redirect("/login");
});

var productController = require("./controller/productController.js");
app.use("/", productController);


var categoryController = require("./controller/categoryController.js");
app.use("/", categoryController);

var restaurentAPI = require("./api/restaurentAPI.js");
app.use("/", restaurentAPI);

var orderController = require("./controller/orderController.js");
app.use("/", orderController);

var orderDetailController = require("./controller/orderDetailController.js");
app.use("/", orderDetailController);

var addressHistory = require("./api/addressHistoryAPI.js");
app.use("/", addressHistory);


var likeAPI = require("./api/likeAPI.js");
app.use("/", likeAPI);


// app.post("/update-product", function(req, res){
//     var product = req.body;
//     if(req.files === {}){
//         productController.updateProduct(product, function(results){
//             res.redirect("/products");
//         });
//     }
//     if(req.files){
//         var file = req.files.product_image;
//         var fileName = Date.now() + ".png";
//         product.product_image = "http://localhost:3000/upload/" + fileName;
//         file.mv("./public/upload/" + fileName, function(err){
//             productController.updateProduct(product, function(results){
//                 res.redirect("/products");
//             });
//         }); 
//     }else{

//     }
// });

app.get("/delete-product=:id", function(req, res){
    if(req.isAuthenticated){
        var id = req.params.id;
        productController.deleteProduct(id, function(results){
            console.log(results);
            res.redirect("/products");
        });
    }else{
        res.redirect("/login");
    }
});


app.post("/api/order/post", function(req, res){
    var order = req.body;
    console.log(order);
    orderDao.addOrder(order, function(oid){
         res.status(200);
         res.json({orderId : oid});
         messageController.sendMessage(io, order.restaurentId, "ORDER", "NEW ORDER");
    });
});



// SOCKET IO
io.on("connection", function(socket) {
    adminDao.updateSocket(socket.handshake.session.passport.user, socket.id);
   
});