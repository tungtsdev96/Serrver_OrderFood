var adminDao = require("../dao/admin-dao.js");

var messageController = {
    sendMessage : function(io, restaurentId, message, data){
        adminDao.getSocketId(restaurentId, function(socketId){
            io.sockets.in(socketId).emit(message, data );
        })

    }
}

module.exports = messageController;