var db = require('../config/dbConnection');

class salaModel {

    async getSessoesBySala (idSala){
        var result;
        //select count(`idSessao`) from `sessoes`
        await db('salas_has_sessoes')
        .select('*')
        .join('sessoes', 'idSessao', '=', 'salas_has_sessoes.sessao_id')        
        .where('salas_has_sessoes.salas_id', '=', idSala)
        .then((response) => {
            result = response;
        })
        .catch((erro) => {
            console.log("Erro getSessoesBySala Model => ", erro);
            return;
        });         
        
        return result;  
    }

    async getNumSalas (){
        var result;

        await db('salas').select('*')
        .then((response) => {
            result = response;
        })
        .catch((erro) => {
            console.log("Erro getNumSalas Model => ", erro);
            return;
        });         
        
        return result.length;  
    }

    async getSalas (){
        var result;

        await db('salas').select('*').orderBy('idSala', 'desc').then((response) => {
            result = response;
        })
        .catch((erro) => {
            console.log("Erro getSala Model => ", erro);
            return;
        });         
        
        return result;  
    }

    async createSala(data) {
        var result;

        await db('salas').insert(data).then((response) => {
            result = response;
        })
        .catch((erro) => {
            console.log("Erro createSala Model => ", erro);
            return;
        });         
        
        return result;  
    }

    async findSala(id){
        var result;

        await db('salas').select('*').where('idSala', '=', id).then((response) => {
            result = response;
        })
        .catch((erro) => {
            console.log("Erro findSala Model => ", erro);
            return;
        });         
        
        return result;     

    }

    async deleteSala(id){
        var result;

        await db('salas_has_sessoes')
        .where('salas_id', '=', id)
        .del()
        .then((response) => {
            result = response;
        })
        .catch((erro) => {
            console.log("Erro deleteSala1 Model => ", erro);
            return;
        });

        // await db('sessoes')
        // .join('salas_has_sessoes', 'sessoes.idSessao', '=', 'salas_has_sessoes.sessao_id')
        // .where('salas_has_sessoes.salas_id', '=', id)
        // .del()
        // .then((response) => {
        //     result = response;
        // })
        // .catch((erro) => {
        //     console.log("Erro deleteSala2 Model => ", erro);
        //     return;
        // });

        await db('salas')
        .where('idSala', '=', id)
        .del()
        .then((response) => {
            result = response;
        })
        .catch((erro) => {
            console.log("Erro deleteSala3 Model => ", erro);
            return;
        });         
        
        return result;   
    }

}

module.exports = new salaModel;