// Make connection
const socket = io.connect("http://localhost:4000");

const message = document.getElementById("message"),
    handle = document.getElementById("handle"),
    btn = document.getElementById("send"),
    output = document.getElementById("chat-output"),
    feedback = document.getElementById("feedback");
let isTyping = false;

// Functions

function sendMessage(){
    socket.emit('chat',{
        message: message.value,
        handle: handle.value
    });
    message.value="";
}

// Emit events
btn.addEventListener("click",()=>{sendMessage()});
/*
btn.addEventListener("click",()=>{
    socket.emit('chat',{
        message: message.value,
        handle: handle.value
    });
    message.value="";
});
*/
message.addEventListener("keyup",(event)=>{
    if(event.keyCode == 13) {sendMessage();return;}

    if(message.value != "" && !isTyping){
        socket.emit('typing',handle.value);
        isTyping = true;
    }else if(message.value == ""){
        socket.emit('nonTyping');
        isTyping = false;
    }
});

// Listem for events

socket.on("chat",function(data){
    isTyping = false;
    feedback.innerHTML = "";
    output.innerHTML += '<p><strong>'+data.handle+':</strong> '+data.message+'</p>';
});

socket.on("typing",(data)=>{
    feedback.innerHTML = '<p><em>' + data +' is typing a message...</em></p>';
});

socket.on("deleteTyping",()=>{
    feedback.innerHTML = "";
});