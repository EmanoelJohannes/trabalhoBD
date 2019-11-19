const Sala = require('../models/salas');

class salaController {

    async index (req, res) {

        var salas = await Sala.getSalas();
        var sessoes = await Sessao.getSessoes();
        var result;

        for ( var i=0; i < salas.length; i++ ){
            result = await Sala.getSessoesBySala(salas[i].idSala);
            salas[i].sessoes = result.length; 
        }

        res.render('lista_salas', {salas : salas});

        //return res.json(salas);        
    }

    async createSalaGet (req, res) {
        res.render('add_sala');
    }

    async createSala (req, res) {

        if ((req.body.capacidade % 2) == 0 ||  (req.body.capacidade % 2) == 1){
            var newSala = await Sala.createSala(req.body);
        }        

        res.redirect('getSalas');

        //return res.json(newSala);

        // await db.query('insert into salas (capacidade) values (?)', req.body.capacidade, function(err, result) {
        //     if (err) throw err;
        //     else return res.json(result);
        // });
    }

    async findSala(req, res){
        var sala = await Sala.findSala(req.params.id);

        return res.json(sala);
    }

    async deleteSala(req, res){
        var salaDeletada = await Sala.deleteSala(req.params.id);

        res.redirect('../getSalas');
        //return res.json(salaDeletada);
    }
}

module.exports = new salaController;