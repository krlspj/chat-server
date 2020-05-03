const express = require('express');
const socket = require('socket.io');

// App setup
const app = express();
const server = app.listen(4000,function(){
    console.log("server listening on port 4000");
});

// Static files
app.use(express.static("public"));

// Socket setup
const io = socket(server);

io.on('connection',function(socket){
    console.log('made socket conection',socket.id);
    //handle chat event
    socket.on("chat",function(data){
        io.sockets.emit('chat',data);
    });
    // handle typing event
    socket.on("typing",(data)=>{
        console.log("typing",data.length);
        socket.broadcast.emit("typing",data);
    });
    socket.on("nonTyping",()=>{
        socket.broadcast.emit("deleteTyping");
    });
});