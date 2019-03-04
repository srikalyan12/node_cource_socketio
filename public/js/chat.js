var socket = io();
function scrollToBotton() {
  //selector
  var messages = jQuery("#messages");
  var newMessage = messages.children('li:last-child');
  var clientHeight = messages.prop('clientHeight');
  var scrollTop = messages.prop('scrollTop');
  var scrollHeight = messages.prop('scrollHeight');
  var newMessageHeight = newMessage.innerHeight();
  var lstMessageHeight = newMessage.prev().innerHeight();
  //height
  if(clientHeight + scrollTop + newMessageHeight + lstMessageHeight >= scrollHeight) {
      messages.scrollTop(scrollHeight);
  }
}
socket.on('connect', function() {
  var params = jQuery.deparam(window.location.search);
  socket.emit('join', params, function(err) {
    if(err) {
        alert(err);
        window.location.href = '/';
    } else {
      console.log('No error');
    }
  });
  // socket.emit('newEmail', {
  //     to: "drew@example.com",
  //     text: "hey drew!  what's going on?"
  // });
  // socket.emit('createMessage', {
  //     to: "drew@example.com",
  //     text: "hey createMSG!  what's going on?"
  // });
});
socket.on('updateUserList', function(users) {
  var ol = jQuery('<ol></ol>');
  users.forEach(function(user) {
     ol.append(jQuery('<li></li>').text(user));
  });
  jQuery('#user').html(ol);
})
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
    scrollToBotton();
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
  scrollToBotton();
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
