const express = require ('express');

const routes = new express.Router();

const aircraftController = require('./controllers/aircraftController');

routes.get('/', dashboardController.index);

// Aircrafts routes
routes.get('/aircrafts', aircraftController.index);

routes.post('/createAircraft', aircraftController.store);

routes.get('/deleteSala/:id', salaController.deleteSala);

module.exports = routes;