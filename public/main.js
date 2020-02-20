//Recibiendo mensajes
var socket = io.connect('http://localhost:8080', { 'forceNew': true });

//usando una de las novedades de ECMAScript6

function render(data) {
    var html = data.map(function(elem, index){
        return(`<div>
                 <strong>${elem.author}</strong>:
                 <em>${elem.text}</em>
        </div>`)
    }).join(" ");
    
    document.getElementById('messages').innerHTML = html;
}
socket.on('messages', function(data) {
    render(data);
});

function addMessage(e) {
    var message = {
      author: document.getElementById('username').value,
      text: document.getElementById('texto').value
    };
    socket.emit('new-message', message);
    return false;
  }

