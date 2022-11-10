const express = require('express');

const planetRouter = require('./planets/planets.router.js');
const launchesRouter = require('./launches/launches.router.js');

const apiV1 = express.Router();

apiV1.use('/planets', planetRouter);
apiV1.use('/launches', launchesRouter);

module.exports = apiV1;
