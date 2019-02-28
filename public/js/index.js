var socket = io();
socket.on('connect', function() {
  console.log("connected to server");
  // socket.emit('newEmail', {
  //     to: "drew@example.com",
  //     text: "hey drew!  what's going on?"
  // });
  // socket.emit('createMessage', {
  //     to: "drew@example.com",
  //     text: "hey createMSG!  what's going on?"
  // });
});
socket.on('disconnect', function() {
  console.log("disconnect from server");
});
// socket.on('mailList', function(mailList) {
//     console.log(mailList);
// });
socket.on('newMessage', function(newMessage) {
    console.log(newMessage)
});
