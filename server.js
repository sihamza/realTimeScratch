var express = require('express');
var app = express() ;
var cors = require('cors')
var randomstring = require("randomstring");
var server = require('http').Server(app);
var io = require('socket.io')(server);
var moment = require('moment')
const port = process.env.PORT   ;
const history = require('connect-history-api-fallback');
var compression = require('compression')
var serveStatic = require('serve-static');


app.use(cors())
app.use(compression())
app.use(history({
  disableDotRule: true,
  verbose: true
}));

app.get("/create", ( req , res ) => {
  let room = randomstring.generate(7)
  while ( io.sockets.adapter.rooms[room] != null ) {
  let room = randomstring.generate(7) }
  res.json({ room : room })
});

io.on("connection", function(socket){
  socket.on('create', function (room) {
    socket.join(room);
    io.to(room).emit('update' ,
      { text : `${socket.id} joined the chatroom `  ,
        user : 'system' ,
        left : false ,
        time : moment().format('MMMM Do YYYY, h:mm:ss a')
      })
    console.log(room);
    socket.on('message', function ( data , fn ) {
      data.time = moment().format('MMMM Do YYYY, h:mm:ss a') ;
      socket.broadcast.to(room).emit('update' , data )
      fn(true);
    });
    socket.on('disconnect', (reason) => {
      io.to(room).emit('update' ,
        { text : `${socket.id} left the chatroom `  ,
          user : 'system' ,
          left : true ,
          time : moment().format('MMMM Do YYYY, h:mm:ss a')
        })
    });
  });
});

server.listen(port);
