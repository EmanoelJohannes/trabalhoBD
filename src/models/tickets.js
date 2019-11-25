var db = require('../config/dbConnection');

class TicketsModel {

    async getTicketByFlight(id) {
        var result;
        //select count(`idSessao`) from `sessoes`
        await db('tickets')
            .select('*')
            .join('flights', 'flights.flightId', '=', 'tickets.flight_id')
            .where('flights.flightId', '=', id)
            .then((response) => {
                result = response;
            })
            .catch((erro) => {
                console.log("Erro getTicketByFlight Model => ", erro);
                return;
            });

        return result;
    }

    async getTickets() {
        var result;
        //select count(`idSessao`) from `sessoes`
        await db('tickets')
            .select('*')
            .join('flights', 'flights.flightId', '=', 'tickets.flight_id')
            .join('passengers', 'passengers.idPassenger', '=', 'tickets.passenger_id')
            .then((response) => {
                result = response;
            })
            .catch((erro) => {
                console.log("Erro getTickets Model => ", erro);
                return;
            });

        return result;
    }

    async storeTicket(flightId, passengerId, date) {
        var result;

        await db('tickets').insert({
            flight_id: flightId,
            passenger_id: passengerId,
            date: date
        })
            .then((response) => {
                result = response;
            })
            .catch((erro) => {
                console.log("Erro storeTicket Model => ", erro);
                return;
            });

        return result;
    }

}

module.exports = new TicketsModel;