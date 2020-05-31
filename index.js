'use strict';
const express = require('express');
const socket = require('socket.io');
const gC = require('./public/getCredentials');

// App setup
const app = express();
const server = app.listen(4001,function(){
    console.log("server listening on port 4001");
});

// Static files
app.use(express.static("./public/"));
// get credentials to stablish conection
app.get('*',(req, res)=>{
    console.log('got and gCred request');
    const _myIP = gC.getCredentials();
    console.log(_myIP);
    res.send(_myIP);
});
// Socket setup
const io = socket(server);

io.on('connection',function(socket){
    console.log('made socket conection',socket.id);
    socket.to()
    //handle chat event
    socket.on("chat",function(data){
        io.sockets.emit('chat',data);
        //console.log("Socket id",socket.id);
    });
    // handle typing event
    socket.on("typing",(data)=>{
        //console.log("typing",data.length);
        socket.broadcast.emit("typing",data);
    });
    socket.on("nonTyping",()=>{
        socket.broadcast.emit("deleteTyping");
    });
});

module.exports = {
    
}