var express = require("express");
var app = express();
const mongoose = require('mongoose');
const beaconRoutes = require("./routes/beacon_route");
const server = require("./mqtt_handler");
var cors = require('cors')
require("dotenv/config");

app.options('*', cors());
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE');
    next();
});
app.use(express.json());
app.use('/api/beacon', beaconRoutes);
app.use(cors());

app.listen(3030, () => console.log("Express running on port 3030"));

mongoose.connect(process.env.DB_CONNECTION, { useUnifiedTopology: true, useNewUrlParser: true })
    .then(() => console.log('Connected to MongoDB!'))
    .catch(err => console.error('Error when connecting to mongo', err));