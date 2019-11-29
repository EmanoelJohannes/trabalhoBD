const Tickets = require('../models/tickets');
const Airports = require('../models/airports');
const Passengers = require('../models/passengers');

const datefns = require('date-fns');
const pt = require('date-fns/locale/pt');

class airportController {

    async index(req, res) {
        const tickets = await Tickets.getTickets();

        for (var i = 0; i < tickets.length; i++) {

            var airportOrig = await Airports.getAirportById(tickets[i].departure_id);
            var airportDest = await Airports.getAirportById(tickets[i].destination_id);

            tickets[i].dateFormatted = datefns.format(tickets[i].date, "d'/'MM'/'yy", { locale: pt });
            tickets[i].hourFormatted = datefns.format(tickets[i].date, "HH':'mm", { locale: pt });

            tickets[i].airportOrigName = airportOrig[0]['name'];
            tickets[i].airportDestName = airportDest[0]['name'];

            tickets[i].dataCompra = datefns.format(new Date(), "d'/'MM'/'yy", { locale: pt });

        }

        console.log(tickets);

        res.render('tickets', { tickets: tickets });
    }

    async passengers(req, res) {
        const passengers = await Passengers.getPassengers();

        res.render('passengers', { passengers: passengers });
    }
}

module.exports = new airportController;