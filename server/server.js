const path = require('path');
const publicPath = path.join(__dirname, '../public');
const express = require('express');
const http = require('http');
const socketIO = require('socket.io');
const app = express();
const { generateMessage, generateLocationMessage } = require('./utils/message');
const { isRealString } = require('./utils/validation');
const {Users} = require('./utils/users');

const server = http.createServer(app);
var io = socketIO(server);
var users = new Users();

const port = process.env.PORT || 3000;

io.on('connection', (socket) => {
  console.log("New user conneted");


  socket.on('join', (params, callback) => {
    if(!isRealString(params.name) || !isRealString(params.room)) {
      return callback('Name and room name are required');
    }
    socket.join(params.room);
    users.removeUser(socket.id);
    users.addUser(socket.id, params.name, params.room);
    io.to(params.room).emit('updateUserList', users.getUserList(params.room));
    socket.emit('newMessage', generateMessage('Admin', 'Welcome to chat App'));
    socket.broadcast.to(params.room).emit('newMessage', generateMessage('Admin', `${params.name} has joined`));
    callback();
  });
  socket.on('disconnect', () => {
      console.log("user disconnected");
      var user = users.removeUser(socket.id);
      if(user) {
        io.to(user.room).emit('updateUserList', users.getUserList(user.room));
        io.to(user.room).emit('newMessage', generateMessage('Admin', `${user.name} has left`));
      }
  });

  //email APP
  // socket.on('newEmail', (email) => {
  //   console.log(email);
  // });
  // socket.emit('mailList', [{
  //   from: "example@example.com",
  //   text: "hey, i am IN!!",
  //   createdAt: new Date()
  // },
  // {
  //   from: "sameple@example.com",
  //   text: "hey, i am IN!!",
  //   createdAt: new Date()
  // },
  // {
  //   from: "now@example.com",
  //   text: "hey, i am IN!!",
  //   createdAt: new Date()
  // }]);
  //chat App
  // socket.emit('newMessage', {
  //   from: "example@example.com",
  //   text: " hey Example!!",
  //   createdAt: new Date()
  // });

   socket.on('createMessage', (createMessage, callback) => {
     var user = users.getUser(socket.id);
     if(user && isRealString(createMessage.text)) {
       io.to(user.room).emit('newMessage', generateMessage(user.name, createMessage.text));
     }
      callback();
   });

   socket.on('createLocationMessage', (coords) => {
      var user = users.getUser(socket.id);
      if(user) {
        io.to(user.room).emit('newLocationMessage',generateLocationMessage(user.name,coords.latitude, coords.longitude));
      }

   });

});

//middleware
app.use(express.static(publicPath));

server.listen(port, () => {
  console.log(`Server is up on port ${port}`);
});
