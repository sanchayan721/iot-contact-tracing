const mongoose = require('mongoose');

const Beacon = mongoose.Schema({
    _id: {
        type: Number
    },
    student_name: {
        type: String,
    },
    beacon_uid: {
        type: String,
    },
    room_no: {
        type: Number,
    },
    floor_no: {
        type: Number,
    },
    is_active: {
        type: Boolean,
    },
    enter_time: {
        type: Date
    },
    exit_time: {
        type: Date
    },
    time_record: [{
        room_no: Number,
        floor_no: Number,
        enter_time: {
            type: Date
        },
        exit_time: {
            type: Date
        }
    }]
}, { collection: 'beacons' });

module.exports = mongoose.model('beacons', Beacon);