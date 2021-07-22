const Beacon = require('../models/Beacon');
const mongoose = require('mongoose');
require("dotenv/config");
var beaconsFromDB = new Set();

async function connectToMongoServer(scannedBeacons) {
    await mongoose.connect(process.env.DB_CONNECTION, { useUnifiedTopology: true, useNewUrlParser: true, useFindAndModify: false })
        .then(() => {
            console.log("Connected to Mongo DB");
            setInterval(function () { setActiveBeaconData(scannedBeacons) }, 10000);
        })
        .catch(err => console.error('Something went wrong', err));
}

async function setActiveBeaconData(beacons) {
    console.log("Active beacons : ",beacons);
    if (beacons) {
        beacons.forEach(beacon => {
            Beacon.updateOne({ beacon_uid: beacon, is_active: false }, {
                floor_no: process.env.FLOOR_NO,
                room_no: process.env.ROOM_NO, is_active: true,
                enter_time: new Date().setHours(new Date().getHours() + 2), exit_time: ""
            }
                , function (err, doc) {
                    // console.log(beacon," entered");
                });
        });
    }
    else {
        beacons = new Set();
    }

    Beacon.find({
        floor_no: process.env.FLOOR_NO,
        room_no: process.env.ROOM_NO
    }, function (err, docs) {
        docs.forEach(doc => {
            beaconsFromDB.add(doc.beacon_uid);
        });
    });
    let beaconsLeft = new Set();
    beaconsFromDB.forEach(elem => beaconsLeft.add(elem));
    beacons.forEach(elem => beaconsLeft.delete(elem));

    beaconsLeft.forEach(beacon => {
        Beacon.findOneAndUpdate({ beacon_uid: beacon, is_active: true }, {
                 is_active: false, exit_time: new Date().setHours(new Date().getHours() + 2)
        }, { new: true }, function (err, doc) {
            if (doc != null) {
                Beacon.updateOne({ beacon_uid: beacon, is_active: false }, {$push: {
                    time_record : { room_no: doc.room_no, floor_no: doc.floor_no, enter_time: doc.enter_time, exit_time: doc.exit_time }
                }}, function (err, time_docs) {
                    console.log("updated historical data")
                });
            }
        });
    });
}



module.exports = { setActiveBeaconData, connectToMongoServer };
