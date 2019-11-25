const Flights = require('../models/flights');
const Aircrafts = require('../models/aircrafts');
const Tickets = require('../models/tickets');
const Airports = require('../models/airports');

const datefns = require ('date-fns');
const pt = require('date-fns/locale/pt');


class flightController {

    async index(req, res) {
        const flights = await Flights.getFlights();

        for (var i = 0; i < flights.length; i++) {
            var airportOrig = await Airports.getAirportById(flights[i].departure_id);
            var airportDest = await Airports.getAirportById(flights[i].destination_id);

            var voo = await Tickets.getTicketByFlight(flights[i].flightId);
            flights[i].capacity = flights[i].capacity - voo.length; 

            flights[i].airportOrigName = airportOrig[0]['name'];
            flights[i].airportDestName = airportDest[0]['name'];

            flights[i].hourFormatted = datefns.format(flights[i].date, "HH':'mm", {locale: pt})
            flights[i].dateFormatted = datefns.format(flights[i].date, "d'/'MM'/'yy", {locale: pt})
        }

        res.render('flights', {flights: flights});
    }

    async storeFlight(req, res) {
        const aircrafts = await Aircrafts.getAircrafts();
        const airports = await Airports.getAirports();

        res.render('createFlight', { aircrafts: aircrafts, airports: airports });
    }

    async storeFlightPOST(req, res) {

       const flightData = req.body;

       await Flights.storeFlight(flightData);

       res.redirect('/flights');
    }
}

module.exports = new flightController;