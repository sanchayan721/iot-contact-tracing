const { scanBeacons } = require('./services/scanner-service');
var mqtt = require('mqtt');
const Beacon = require('./models/Beacon');

scanBeacons();

topic = '/3/310';
var client = mqtt.connect('mqtt://localhost', {
    port: 8081,
    clientId: 'room310_scanner'
});

function publishScannedData() {
    Beacon.find({ 'is_active': true, 'room_no': 310 }, function(err, docs) {
        console.log(docs)
        client.publish(topic, JSON.stringify(docs));
    });
}

client.on('connect', function() {
    console.log("Scanner in Room 310 in 1st floor connected " + client.connected);
    client.subscribe(topic);
    setInterval(function() { publishScannedData() }, 3000);
});

client.on('message', function(topic, message) {
    console.log(message.toString());
});