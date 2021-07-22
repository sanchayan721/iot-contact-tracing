const router = require('express').Router();
const { getLiveBeaconsCountPerRoom, getLiveBeaconsCountPerDepartment, getRecordsPerMatricula } = require('../service/repo_services');

router.get('/beaconLiveBeaconsPerRoom', async (req, res) => {
    try {
        getLiveBeaconsCountPerRoom(res);
    } catch (err) {
        res.status(400).send(err);
    }
});

router.get('/beaconLiveBeaconsPerDepartment', async (req, res) => {
    try {
        getLiveBeaconsCountPerDepartment(res);
    } catch (err) {
        res.status(400).send(err);
    }
});

router.get('/timeRecordsPerBeacon', async (req, res) => {
    try {
        getRecordsPerMatricula(req.query.matricula ,res);
    } catch (err) {
        res.status(400).send(err);
    }
});
module.exports = router;
