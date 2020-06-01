'use strict';


// Make connection
//const serverIp = prompt("Introduce the server Ip",'http://xxx.xxx.xxx:YYYY/');
// XmlHttpRequest

let xhr = new XMLHttpRequest();
const _sync = false;
const _url = window.location.href;
//const _hostName = window.location.hostname;
//const _protocol =  window.location.protocol;
let serverIP = _url;
console.log('buildind serverIP',serverIP);
//xhr.open("GET","chatCredentials.json",!_sync);
//xhr.open("GET","index.js",!_sync);
xhr.open("GET","./index.js",!_sync);
//xhr.setRequestHeader('Content-Type', 'application/json');
xhr.send();

if(!_sync){
    xhr.onreadystatechange = function(){
        if (this.readyState == 4 && this.status == 200) {
            console.log('async xhr response:',xhr.response);
        }
    };
}else{
    console.log('sync xhr response:',xhr.response);
//    console.log('response',xhr.response);
}


//--------------------------------------------
//console.log('from chat myIP',myIP);
if(serverIP) ;// pass
else serverIP = prompt("Introduce the server IP",'http://xxx.xxx.xxx:YYYY/'); 

const socket = io.connect(serverIP);
//const socket = io.connect('http://xx.xxxx.x.x:PPPP/');
//const userName = prompt("type ur alias");

const message = document.getElementById("message"),
    //handle = document.getElementById("handle"),
    handle = document.getElementById("handle"),
    btn = document.getElementById("send"),
    output = document.getElementById("chat-output"),
    feedback = document.getElementById("feedback");
let isTyping = false;
const psound = new Audio("./resources/juntos-cut.mp3");
let cw = document.getElementById("chat-window");
let sId;

//handle.value = userName;

// Functions
function sendMessage(){
    socket.emit('chat',{
        message: message.value,
        handle: handle.value
    });
    sId = socket.id;
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
    if(data.handle != handle.value) psound.play();
//    cw = document.getElementById("chat-window");
    if(cw.scrollHeight - cw.offsetHeight > 0 && cw.scrollHeight-cw.offsetHeight > cw.scrollTop) cw.scrollBy(0,cw.scrollHeight-cw.offsetHeight-cw.scrollTop);
});

socket.on("typing",(data)=>{
    feedback.innerHTML = '<p><em>' + data +' is typing a message...</em></p>';
    if(cw.scrollHeight - cw.offsetHeight > 0 && cw.scrollHeight-cw.offsetHeight > cw.scrollTop) cw.scrollBy(0,cw.scrollHeight-cw.offsetHeight-cw.scrollTop);

});

socket.on("deleteTyping",()=>{
    feedback.innerHTML = "";
});
