var Passport = require("passport");
var LocalStrategy = require("passport-local").Strategy;
var pool = require("./mysql.js");
Passport.use(new LocalStrategy(function(username, password, done){
    var sql = "SELECT * FROM admin WHERE username = '" + username + "' AND password ='" + password +  "'";
    pool.query(sql, function (error, results, fields) {
        if (error) throw error;
        if(results.length > 0){
            var user = {};
            user.admin_id = results[0].admin_id;
            user.admin_name = results[0].admin_name;
            user.username = results[0].username;
            user.password = results[0].password;  
            user.admin_phone = results[0].admin_phone;
            user.restaurent_id = results[0].restaurent_id;
            return done(null, user);
        }
        return done(null, false);
    });
}));

Passport.serializeUser(function(user, done){
    done(null, user.restaurent_id);
});

Passport.deserializeUser(function(name, done){
    // fs.readFile("./userdb.json", function(err, data){
    //     const db = JSON.parse(data);
    //     var userRecord = db.find(user => user.usr == name);
    //     if(userRecord){
    //         return done(null, userRecord);
    //     }
    //     return done(null, false);
    // });
    var sql = "SELECT * FROM admin WHERE restaurent_id = " + name + "";
    pool.query(sql, function (error, results, fields) {
        if (error) throw error;
        if(results.length > 0){
            var user = {};
            user.admin_id = results[0].admin_id;
            user.admin_name = results[0].admin_name;
            user.username = results[0].username;
            user.password = results[0].password;  
            user.admin_phone = results[0].admin_phone;
            user.restaurent_id = results[0].restaurent_id;
            return done(null, user);
        }
        return done(null, false);
    });
});

module.exports = Passport;