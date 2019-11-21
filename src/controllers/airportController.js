const Airports = require('../models/airports');

class airportController {

    async index(req, res) {
        const airports = await Airports.getAirports();
        res.render('airports', { airports: airports });
    }

    async storeAirport(req, res) {

        const result = await Airports.storeAirport(req.body);

        if (result) {
            res.redirect('/airports');
        }

    }
}

module.exports = new airportController;