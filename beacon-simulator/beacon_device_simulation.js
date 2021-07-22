var bleno = require('bleno');

var beacon_uuid = '00000000-0000-0000-0000-000000000000'

//on state change 
bleno.on('stateChange', function(state) {
    console.log(state)
    console.log('on -> stateChange: ' + state);
    if (bleno.state === 'poweredOn') {
        bleno.startAdvertisingIBeacon(beacon_uuid, 0, 0, 0); //advertising ibeacon
    } else {
        bleno.stopAdvertising();
    }
});

//triggers when beacon is started
bleno.on('advertisingStart', function(error) {
    console.log('Started Advertising beacon uuid : ', beacon_uuid);
    console.log(error ? 'error ' + error : 'success');
});

//on stop beacon
bleno.on('advertisingStop', function() {
    console.log('on -> advertisingStop');
});