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
    var formattedTime = moment(newMessage.createdAt).format('h:mm a');
    var template = jQuery('#message-template').html();
    var html = Mustache.render(template, {
      text: newMessage.text,
      from: newMessage.from,
      createdAt: formattedTime
    });
    jQuery('#messages').append(html);
    // var li = jQuery('<li></li>');
    // li.text(`${newMessage.from} ${formattedTime}: ${newMessage.text} `);
    // jQuery('#messages').append(li);
});
socket.on('newLocationMessage', function(message) {
  var formattedTime = moment(message.createdAt).format('h:mm a');
  var template = jQuery("#location-message-template").html();
  var html = Mustache.render(template, {
    from: message.from,
    url: message.url,
    createdAt: formattedTime
  });
  jQuery("#messages").append(html);
  // var li =jQuery('<li></li>');
  // var a = jQuery('<a target="_blank">my Current Location</a>');
  // li.text(`${message.from} ${formattedTime}: `);
  // a.attr('href', message.url);
  // li.append(a);
  // jQuery('#messages').append(li);
});
jQuery('#message-form').on('submit', function(e) {
    e.preventDefault();
    socket.emit('createMessage', {
      from: 'User',
      text: jQuery('[name=mesaage]').val()
    }, function() {
      jQuery('[name=mesaage]').val('');
    });
});

var loctionButton = jQuery('#send_location');
loctionButton.on('click', function() {
  loctionButton.attr('disabled', 'disabled').text('Sending Location...');
  if(!navigator.geolocation) {
    return alert('Geolocation not supported in this browser')
  }
  navigator.geolocation.getCurrentPosition(function(position) {
      console.log(position);
      socket.emit('createLocationMessage', {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude
      });
      loctionButton.removeAttr('disabled').text('Send Location');;
  }, function() {
    loctionButton.removeAttr('disabled').text('Send Location');;
    alert('unable to fetch location');
  })
});
