const BeaconScanner = require('node-beacon-scanner');
const scanner = new BeaconScanner();
const { connectToMongoServer } = require('./repo_service');
const beacons = new Set();

function scanBeacons(){
    scanner.startScan().then(() => {
        connectToMongoServer(beacons);
        console.log('Started to scan.');
        setInterval( function() { beacons.clear() }, 9800);
    }).catch((error) => {
        console.error(error);
    });
    scanner.onadvertisement = (beacon) => {
        beacons.add(beacon.iBeacon.uuid);
    }
}

module.exports = { scanBeacons };
