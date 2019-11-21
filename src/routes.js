const express = require('express');

const routes = new express.Router();

const dashboardController = require('./controllers/dashboardController');
const aircraftController = require('./controllers/aircraftController');
const airportController = require('./controllers/airportController');
const flightController = require('./controllers/flightController');


routes.get('/', dashboardController.index);

// Aircrafts routes
routes.get('/aircrafts', aircraftController.index);
routes.post('/aircrafts', aircraftController.storeAircratf);

// Airports routes
routes.get('/airports', airportController.index);
routes.post('/airports', airportController.storeAirport);

// Flights routes
routes.get('/flights', flightController.index);
routes.get('/createFlight', flightController.storeAirport);
// routes.post('/createFlight', flightController.storeFlight);


module.exports = routes;