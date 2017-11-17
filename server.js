const app   = require('express')();
const http  = require('http').Server(app);
const io    = require('socket.io')(http);

const port = process.env.PORT || 3000;

app.get('/', function(req, res){
  res.send('<h1>Hello world</h1>');
});

io.on('connection',(socket) => {
    socket.on('send-message',(data) => {
        io.emit('message-received',data);
    });

    socket.on('inbox',(data) => {
      io.emit('inbox-refresh',data);
  });
});

http.listen(port, function(){
  console.log('listening on *: ' + port);
});