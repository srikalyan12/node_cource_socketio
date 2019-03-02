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
    console.log(newMessage);
    var li = jQuery('<li></li>');
    li.text(`${newMessage.from} : ${newMessage.text} `);
    jQuery('#messages').append(li);
});
socket.on('newLocationMessage', function(message) {
  var li =jQuery('<li></li>');
  var a = jQuery('<a target="_blank">my Current Location</a>');
  li.text(`${message.from}: `);
  a.attr('href', message.url);
  li.append(a);
  jQuery('#messages').append(li);
});
jQuery('#message-form').on('submit', function(e) {
    e.preventDefault();
    socket.emit('createMessage', {
      from: 'User',
      text: jQuery('[name=mesaage]').val()
    }, function() {
    });
});

var loctionButton = jQuery('#send_location');
loctionButton.on('click', function() {
  if(!navigator.geolocation) {
    return alert('Geolocation not supported in this browser')
  }
  navigator.geolocation.getCurrentPosition(function(position) {
      console.log(position);
      socket.emit('createLocationMessage', {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude
      });
  }, function() {
    alert('unable to fetch location');
  })
});
