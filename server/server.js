const path = require('path');
const publicPath = path.join(__dirname, '../public');
const express = require('express');
const http = require('http');
const socketIO = require('socket.io');
const app = express();
const { generateMessage } = require('./utils/message');

const server = http.createServer(app);
var io = socketIO(server);

const port = process.env.PORT || 3000;

io.on('connection', (socket) => {
  console.log("New user conneted");

  socket.emit('newMessage', generateMessage('Admin', 'Welcome to chat App'));
  socket.broadcast.emit('newMessage', generateMessage('Admin', 'New User has joined'));
  socket.on('disconnect', () => {
      console.log("user disconnected");
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
      io.emit('newMessage', generateMessage(createMessage.from, createMessage.text));
      callback();
   });
});

//middleware
app.use(express.static(publicPath));

server.listen(port, () => {
  console.log(`Server is up on port ${port}`);
});
