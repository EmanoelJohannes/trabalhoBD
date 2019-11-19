var db = require('../config/dbConnection');

class ingressoModel {

    async getNumIngressos (){
        var result;

        await db('ingressos').select('*')
        .then((response) => {
            result = response;
        })
        .catch((erro) => {
            console.log("Erro getNumIngressos Model => ", erro);
            return;
        });         
        
        return result.length;  
    }


    async getIngressosBySessao(idSessao){
        var result;
        //select count(`idSessao`) from `sessoes`
        await db('ingressos')
        .select('*')
        .join('sessoes', 'ingressos.idSessao', '=', 'sessoes.idSessao')
        .where('sessoes.idSessao', '=', idSessao)
        .then((response) => {
            result = response;
        })
        .catch((erro) => {
            console.log("Erro getIngressosBySessao Model => ", erro);
            return;
        });         
        
        return result;  
    }

    async getCapacidadeSala(idSessao){
        var result;

        await db('salas_has_sessoes').select('salas.capacidade')
        .join('salas', 'salas.idSala', '=', 'salas_has_sessoes.salas_id')
        .where('salas_has_sessoes.sessao_id', '=', idSessao)
        .then((response) => {
            result = response;
        })
        .catch((erro) => {
            console.log("Erro getCapacidadeSala Model => ", erro);
            return;
        });         
        
        return result[0];  
    }

    async getIngressos (){
        var result;

        await db('ingressos').select('*')
        .join('sessoes', 'ingressos.idSessao', '=', 'sessoes.idSessao')
        .join('filmes', 'filmes.idFilme', '=', 'sessoes.idFilme')
        .join('salas_has_sessoes as shs', 'shs.sessao_id', '=', 'sessoes.idSessao')
        .orderBy('idIngresso', 'desc')
        .then((response) => {
            result = response;
        })
        .catch((erro) => {
            console.log("Erro getIngressos Model => ", erro);
            return;
        });         
        
        return result;  
    }

    async createIngresso(data) {
        var result;

        await db('ingressos').insert(data).then((response) => {
            result = response;
        })
        .catch((erro) => {
            console.log("Erro createIngresso Model => ", erro);
            return;
        });         
        
        return result;  
    }

    async findIngresso(id){
        var result;

        await db('ingressos').select('*').where('idIngresso', '=', id).then((response) => {
            result = response;
        })
        .catch((erro) => {
            console.log("Erro findIngresso Model => ", erro);
            return;
        });         
        
        return result;     

    }

}

module.exports = new ingressoModel;