const Beacon = require('../model/Beacon');

function getLiveBeaconsCountPerRoom(res) {
  Beacon.aggregate([
    {
      $match:
        { is_active: true }
    }, {
      $group: {
        _id: "$room_no",
        count: { $sum: 1 }
      }
    }]).exec((err, data) => {
      if (err) {
        throw err;
      };
      res.status(200).send(data);
    })
}


function getLiveBeaconsCountPerDepartment(res) {
  Beacon.aggregate([
    {
      $match:
        { is_active: true }
    }, {
      $group: {
        _id: "$department",
        count: { $sum: 1 }
      }
    }]).exec((err, data) => {
      if (err) {
        throw err;
      };
      res.status(200).send(data);
    })
}

function getRecordsPerMatricula(req, res) {
  Beacon.findById({ _id: req }, { student_name: 1, department:1, time_record: 1 }).exec((err, data) => {
    if (err) {
      throw err;
    };
    res.status(200).send(data);
  })
}

module.exports = { getLiveBeaconsCountPerRoom, getLiveBeaconsCountPerDepartment, getRecordsPerMatricula };
