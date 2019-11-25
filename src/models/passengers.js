var db = require('../config/dbConnection');

class PassengersModel {

    async getPassengers(){
        var result;
        //select count(`idSessao`) from `sessoes`
        await db('passengers')
        .select('*')
        .then((response) => {
            result = response;
        })
        .catch((erro) => {
            console.log("Erro getPassengers Model => ", erro);
            return;
        });         
        
        return result;  
    }

    async storePassenger(data) {
        var result;

        await db('passengers').insert(data)
            .then((response) => {
                result = response;
            })
            .catch((erro) => {
                console.log("Erro storePassenger Model => ", erro);
                return;
            });

        return result;
    }

}

module.exports = new PassengersModel;