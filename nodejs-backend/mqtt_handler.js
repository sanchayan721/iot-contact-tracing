var mosca = require('mosca');
const { sendSMS } = require('./service/sms-service');
require("dotenv/config");

var smsCounter = 1;

var settings = {
    port: 8081,
    http: { port: 8080, bundle: true, static: './' }
};

var server = new mosca.Server(settings, function() {
    console.log("Mosca up");
});

server.on("ready", function() {
    console.log("Server up");
});

// fired when a  client is connected
server.on("clientConnected", function(client) {
    console.log("client connected", client.id);
});

var message = {
    topic: '/3/310',
    payload: ''
};
// fired when a message is received
server.on('published', function(packet, client) {
    try {
        if (typeof JSON.parse(packet.payload) === 'object' && JSON.parse(packet.payload).length > 1) {
            message.payload = "Room is overcrowded.";
            server.publish(message); //server publishes messages
            sendSMS(smsCounter);
            smsCounter = smsCounter + 1;
        }
    } catch (exce) {
        // console.log('This is the scanner name');
    }
});

// fired when a client subscribes to a topic
server.on('subscribed', function(topic, client) {
    console.log("subscribed : ", topic);
});

// fired when a client subscribes to a topic
server.on('unsubscribed', function(topic, client) {
    console.log("unsubscribed : ", topic);
});

// fired when a client is disconnected
server.on("clientDisconnected", function(client) {
    console.log("clientDisconnected : ", client.id);
});



module.exports = { server };