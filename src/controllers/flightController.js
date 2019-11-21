const Flights = require('../models/flights');
const Aircrafts = require('../models/aircrafts');
const Airports = require('../models/airports');


class flightController {

    async index(req, res) {
        const flights = await Flights.getFlights();
        res.render('flights', { flights: flights });
    }

    async storeAirport(req, res) {
        const aircrafts = await Aircrafts.getAircrafts();
        const airports = await Airports.getAirports();

        res.render('createFlight', {});
    }
}

module.exports = new flightController;