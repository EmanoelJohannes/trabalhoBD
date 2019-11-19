const express = require('express');

const routes = new express.Router();

const dashboardController = require('./controllers/dashboardController');
const aircraftController = require('./controllers/aircraftController');

routes.get('/', dashboardController.index);

// Aircrafts routes
routes.get('/aircrafts', aircraftController.index);
routes.post('/aircrafts', aircraftController.storeAircratf);

// routes.post('/createAircraft', aircraftController.store);

module.exports = routes;