var db = require('../config/dbConnection');

class FlightsModel {

    async getFlights() {
        var result;

        await db('flights')
            .select('*')
            .then((response) => {
                result = response;
            })
            .catch((erro) => {
                console.log("Erro getFlights Model => ", erro);
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

}

module.exports = new FlightsModel;