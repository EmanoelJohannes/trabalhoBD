var db = require('../config/dbConnection');

class AircraftsModel {

    async getAircrafts() {
        var result;

        await db('aircrafts')
            .select('*')
            .then((response) => {
                result = response;
            })
            .catch((erro) => {
                console.log("Erro getAircrafts Model => ", erro);
                return;
            });

        return result;
    }

    async storeAircraft(data) {
        var result;

        await db('aircrafts').insert(data)
            .then((response) => {
                result = response;
            })
            .catch((erro) => {
                console.log("Erro storeAircraft Model => ", erro);
                return;
            });

        return result;
    }

}

module.exports = new AircraftsModel;