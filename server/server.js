const path = require('path');
const publicPath = path.join(__dirname, '../public');
const express = require('express');
const http = require('http');
const socketIO = require('socket.io');
const app = express();

const server = http.createServer(app);
var io = socketIO(server);

const port = process.env.PORT || 3000;

io.on('connection', (socket) => {
  console.log("New user conneted");
  socket.on('disconnect', () => {
      console.log("user disconnected");
  });
});

//middleware
app.use(express.static(publicPath));

server.listen(port, () => {
  console.log(`Server is up on port ${port}`);
});
