var mysql = require('mysql');
// var pool = mysql.createPool({
// <<<<<<< HEAD
// //     host:   "sql12.freemysqlhosting.net",
// //     user:   "sql12199196",
// //     password: "GhggawPFZx",
// //     database: "sql12199196",
// =======
// //     host:   "localhost",
// //     user:   "root",
// //     password: "1996",
// //     database: "ptpmcn",
// >>>>>>> master
// // });


// var pool = mysql.createPool({
//     host:   "fdb13.awardspace.net",
//     user:   "2488338_ptpmcn",
//     password: "2488338_ptpmcn",
//     database: "ngan28091996",
// });

var pool = mysql.createPool({
    host:   "localhost",
    user:   "root",
    password: "1996",
    database: "ptpmcn",
});

module.exports = pool;