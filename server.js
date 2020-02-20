var express = require('express');
var app = express();

var server = require('http').Server(app);
var io = require('socket.io')(server);
/*
Los websockets son una tecnología que permite una comunicación bidireccional 
entre cliente y servidor sobre un único socket TCP

npm init -y

creamos una aplicación con express, que pasaremos a un servidor http y todo esto irá ligado 
al servidor de websockets que creamos con socket.io

npm i nodemon -D => Evitar el reinicio del servidor

*/

//cual es la ruta que tendrán los ficheros estáticos, lo hacemos con el middleware
app.use(express.static('public'));

app.get('/hello',function(req,res) {
    res.status(200).send("Hola Mundo !!!");
});
var messages = [{
    author: "Carlos",
    text: "Hola! que tal?"
},{
    author: "Pepe",
    text: "Muy bien! y tu??"
},{
    author: "Paco",
    text: "Genial!"
}];

io.on('connection', function(socket) {
    console.log('Un cliente se ha conectado');
    //event = messages
   // socket.emit('messages', messages);
    
    socket.on('new-message', function(data) {
        messages.push(data);
        io.sockets.emit('messages', messages);
      });
});
/*
setInterval(function (){
    io.emit('messages',messages);
},3000);*/

server.listen(8080, function() {
    console.log('Servidor corriendo en http://localhost:8080');
});