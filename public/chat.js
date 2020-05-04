// Make connection
const socket = io.connect("http://localhost:4001");

const message = document.getElementById("message"),
    handle = document.getElementById("handle"),
    btn = document.getElementById("send"),
    output = document.getElementById("chat-output"),
    feedback = document.getElementById("feedback");
let isTyping = false;
const psound = new Audio("./resources/juntos-cut.mp3");
let cw = document.getElementById("chat-window");

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
    psound.play();
//    cw = document.getElementById("chat-window");
    if(cw.scrollHeight - cw.offsetHeight > 0 && cw.scrollHeight-cw.offsetHeight > cw.scrollTop) cw.scrollBy(0,cw.scrollHeight-cw.offsetHeight-cw.scrollTop);
});

socket.on("typing",(data)=>{
    feedback.innerHTML = '<p><em>' + data +' is typing a message...</em></p>';
});

socket.on("deleteTyping",()=>{
    feedback.innerHTML = "";
});