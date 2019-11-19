const Aircrafts = require('../models/aircrafts');

class aircraftController {

    async index(req, res) {

        // for (var i = 0; i < salas.length; i++) {
        //     result = await Sala.getSessoesBySala(salas[i].idSala);
        //     salas[i].sessoes = result.length;
        // }

        const aircrafts = await Aircrafts.getAircrafts();
        res.render('aircrafts', { aircrafts: aircrafts });
    }

    async storeAircratf(req, res) {

        const result = await Aircrafts.storeAircraft(req.body);

        if (result) {
            res.redirect('/aircrafts');
        }

    }
}

module.exports = new aircraftController;