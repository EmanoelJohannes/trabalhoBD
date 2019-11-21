var db = require('../config/dbConnection');

class AirportsModel {

    async getAirports() {
        var result;

        await db('airports')
            .select('*')
            .then((response) => {
                result = response;
            })
            .catch((erro) => {
                console.log("Erro getAirport Model => ", erro);
                return;
            });

        return result;
    }

    async storeAirport(data) {
        var result;

        await db('airports').insert(data)
            .then((response) => {
                result = response;
            })
            .catch((erro) => {
                console.log("Erro storeAirport Model => ", erro);
                return;
            });

        return result;
    }

}

module.exports = new AirportsModel;