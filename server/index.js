var express = require('express');
var socket = require('socket.io');
var users = [];


// App setup
var app = express();
var server = app.listen(3000, function(){
    console.log('listening for requests on port 3000');
});

// Socket setup
var io = socket(server);

            

// Listen for new connection and print a message in console 
io.on('connection',(socket)=>{

    console.log('new connection made.');


    socket.on('join', function(data){
      //joining
      socket.join(data.room);

      users.push(data.user);

      console.log(data.user + 'joined the room : ' + data.room);

      console.log(users);

      socket.broadcast.to(data.room).emit('new user joined', {user:data.user, message:'has joined this room.'});
    });


    socket.on('leave', function(data){
    
      console.log(data.user + 'left the room : ' + data.room);

      socket.broadcast.to(data.room).emit('left room', {user:data.user, message:'has left this room.'});

      socket.leave(data.room);
    });

    socket.on('message', function(data){
        io.in(data.room).emit('new message', data);
    });

     socket.on('disconnect', function() {
        users.splice(users.indexOf(socket), 1);
    });

        socket.on('ready', function(data) {
                socket.emit('job', {users});   // send jobs
        });

    
    //socket.on('message', function(user,event,data){
    //io.sockets.to(user).emit(event,data);
    //});

});
