var db = require('../config/dbConnection');

class FlightsModel {

    async getFlights() {
        var result;

        await db('flights')
            .select('*')
            .join('aircrafts', 'aircrafts.id', '=', "flights.aircraft_id")
            .then((response) => {
                result = response;
            })
            .catch((erro) => {
                console.log("Erro getFlights Model => ", erro);
                return;
            });

        return result;
    }

    async getFlightById(id) {
        var result;

        await db('flights')
            .select('*')
            .join('aircrafts', 'aircrafts.id', '=', "flights.aircraft_id")
            .where('flights.flightId', '=', id)
            .then((response) => {
                result = response;
            })
            .catch((erro) => {
                console.log("Erro getFlightById Model => ", erro);
                return;
            });

        return result;
    }

    async storeFlight(data) {
        var result;

        await db('flights').insert(data)
            .then((response) => {
                result = response;
            })
            .catch((erro) => {
                console.log("Erro storeFlight Model => ", erro);
                return;
            });

        return result;
    }

    async disableFlight(id) {
        var result;

        await db('flights')
            .update(({
                flightStatus: 0
            }))
            .where('flights.flightId', '=', id)
            .then((response) => {
                result = response;
            })
            .catch((erro) => {
                console.log("Erro disableFlight Model => ", erro);
                return;
            });

        return result;
    }

}

module.exports = new FlightsModel;