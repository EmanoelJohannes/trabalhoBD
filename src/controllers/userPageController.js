const Flights = require('../models/flights');
const Passengers = require('../models/passengers');
const Tickets = require('../models/tickets');
const Airports = require('../models/airports');

const datefns = require ('date-fns');
const pt = require('date-fns/locale/pt');


class userPageController {

    async index(req, res) {

        const flights = await Flights.getFlights();

        for (var i = 0; i < flights.length; i++) {
            var airportOrig = await Airports.getAirportById(flights[i].departure_id);
            var airportDest = await Airports.getAirportById(flights[i].destination_id);

            var voo = await Tickets.getTicketByFlight(flights[i].id);
            flights[i].capacity = flights[i].capacity - voo.length; 

            flights[i].airportOrigName = airportOrig[0]['name'];
            flights[i].airportDestName = airportDest[0]['name'];

            flights[i].airportOrigSigla = airportOrig[0]['sigla'];
            flights[i].airportDestSigla = airportDest[0]['sigla'];

            flights[i].hourFormatted = datefns.format(flights[i].date, "HH':'mm", {locale: pt})
            flights[i].dateFormatted = datefns.format(flights[i].date, "d 'de' MMMM' de 'yyyy", {locale: pt})

            flights[i].endHour = datefns.addHours(flights[i].date, flights[i].duration);
            flights[i].endHourFormatted = datefns.format(flights[i].endHour, "HH':'mm", {locale: pt})

        }       

        console.log(flights);
        res.render('user/index', {flights: flights});
    }

    async details(req, res) {

        const flights = await Flights.getFlightById(req.params.id);

        for (var i = 0; i < flights.length; i++) {
            var airportOrig = await Airports.getAirportById(flights[i].departure_id);
            var airportDest = await Airports.getAirportById(flights[i].destination_id);

            var voo = await Tickets.getTicketByFlight(flights[i].id);
            flights[i].capacity = flights[i].capacity - voo.length; 

            flights[i].airportOrigName = airportOrig[0]['name'];
            flights[i].airportDestName = airportDest[0]['name'];

            flights[i].airportOrigSigla = airportOrig[0]['sigla'];
            flights[i].airportDestSigla = airportDest[0]['sigla'];

            flights[i].hourFormatted = datefns.format(flights[i].date, "HH':'mm", {locale: pt})
            flights[i].dateFormatted = datefns.format(flights[i].date, "d 'de' MMMM' de 'yyyy", {locale: pt})

            flights[i].endHour = datefns.addHours(flights[i].date, flights[i].duration);
            flights[i].endHourFormatted = datefns.format(flights[i].endHour, "HH':'mm", {locale: pt})

        }       

        console.log("voo ->", flights);

        res.render('user/details', {flights: flights});
    }

    async details(req, res) {

        const flights = await Flights.getFlightById(req.params.id);

        for (var i = 0; i < flights.length; i++) {
            var airportOrig = await Airports.getAirportById(flights[i].departure_id);
            var airportDest = await Airports.getAirportById(flights[i].destination_id);

            var voo = await Tickets.getTicketByFlight(flights[i].id);
            flights[i].capacity = flights[i].capacity - voo.length; 

            flights[i].airportOrigName = airportOrig[0]['name'];
            flights[i].airportDestName = airportDest[0]['name'];

            flights[i].airportOrigSigla = airportOrig[0]['sigla'];
            flights[i].airportDestSigla = airportDest[0]['sigla'];

            flights[i].hourFormatted = datefns.format(flights[i].date, "HH':'mm", {locale: pt})
            flights[i].dateFormatted = datefns.format(flights[i].date, "d 'de' MMMM' de 'yyyy", {locale: pt})

            flights[i].endHour = datefns.addHours(flights[i].date, flights[i].duration);
            flights[i].endHourFormatted = datefns.format(flights[i].endHour, "HH':'mm", {locale: pt})

        }       

        console.log("voo ->", flights);

        res.render('user/details', {flights: flights});
    }

    async detailsPOST(req, res) {
        const {name, email} = req.body;

        const passenger = await Passengers.storePassenger({name, email});

        await Tickets.storeTicket(req.params.id, passenger, new Date());

        res.redirect('/');
    }
}

module.exports = new userPageController;