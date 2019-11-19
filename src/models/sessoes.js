var db = require('../config/dbConnection');

class sessaoModel {

    async getNumSessoes (){
        var result;

        await db('sessoes').select('*')
        .then((response) => {
            result = response;
        })
        .catch((erro) => {
            console.log("Erro getNumSessao Model => ", erro);
            return;
        });         
        
        return result.length;  
    }

    async getSessoes (){
        var result;

        await db('sessoes').select('*')
        .join('salas_has_sessoes', 'sessoes.idSessao', '=', "salas_has_sessoes.sessao_id")
        .join('filmes', 'sessoes.idFilme', '=', "filmes.idFilme")
        .orderBy('sessoes.data_sessao', 'desc')
        .then((response) => {
            result = response;
        })
        .catch((erro) => {
            console.log("Erro getSessao Model => ", erro);
            return;
        });         
        
        return result;  
    }

    async createSessao(data) {
        var resultId;

        await db('sessoes').insert([{inicio: data.inicio, fim: data.fim, idFilme: data.idFilme}])
        .then((response) => {
            resultId = response;
        })
        .catch((erro) => {
            console.log("Erro createSessao1 Model => ", erro);
            return;
        });  
        
        await db('salas_has_sessoes').insert([{salas_id: data.idSala, sessao_id: resultId}])
        .then((response) => {
            resultId = response;
        })
        .catch((erro) => {
            console.log("Erro createSessao2 Model => ", erro);
            return;
        }); 
        
        // return result;  
    }

    async findSessao(id){
        var result;

        await db('sessoes').select('*').where('idSessao', '=', id).then((response) => {
            result = response;
        })
        .catch((erro) => {
            console.log("Erro findSessao Model => ", erro);
            return;
        });         
        
        return result;     

    }

    async deleteSessao(id){
        var result;
        
        await db('salas_has_sessoes').where('sessao_id', '=', id).del().then((response) => {
            result = response;
        })
        .catch((erro) => {
            console.log("Erro deleteSessao2 Model => ", erro);
            return;
        }); 

        await db('sessoes').where('idSessao', '=', id).del().then((response) => {
            result = response;
        })
        .catch((erro) => {
            console.log("Erro deleteSessao1 Model => ", erro);
            return;
        });      
        
        return result;   
    }

}

module.exports = new sessaoModel;