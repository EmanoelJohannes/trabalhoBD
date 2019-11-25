const express = require('express');

const routes = new express.Router();

const dashboardController = require('./controllers/dashboardController');
const aircraftController = require('./controllers/aircraftController');
const airportController = require('./controllers/airportController');
const flightController = require('./controllers/flightController');
const ticketController = require('./controllers/ticketController');
const userPageController = require('./controllers/userPageController');

routes.get('/', userPageController.index);
routes.get('/details/:id', userPageController.details);
routes.post('/details/:id', userPageController.detailsPOST);


routes.get('/admin', dashboardController.index);

// Aircrafts routes
routes.get('/aircrafts', aircraftController.index);
routes.post('/aircrafts', aircraftController.storeAircratf);

// Airports routes
routes.get('/airports', airportController.index);
routes.post('/airports', airportController.storeAirport);

routes.get('/tickets', ticketController.index);

routes.get('/passengers', ticketController.passengers);


// Flights routes
routes.get('/flights', flightController.index);
routes.get('/disableFlight/:id', flightController.disableFlight);
routes.get('/createFlight', flightController.storeFlight);
routes.post('/createFlight', flightController.storeFlightPOST);


module.exports = routes;