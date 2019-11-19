var db = require("../config/dbConnection");

class filmeModel {
  async getSessoesByFilme(idFilme) {
    var result;
    //select count(`idSessao`) from `sessoes`
    await db("sessoes")
      .select("*")
      .where("sessoes.idFilme", "=", idFilme)
      .then(response => {
        result = response;
      })
      .catch(erro => {
        console.log("Erro getSessoesByFilme Model => ", erro);
        return;
      });

    return result;
  }

  async getNumFilmes() {
    var result;

    await db("filmes")
      .select("*")
      .then(response => {
        result = response;
      })
      .catch(erro => {
        console.log("Erro getNumFilmes Model => ", erro);
        return;
      });

    return result.length;
  }

  async getFilmes() {
    var result;

    await db("filmes")
      .select("*")
      .orderBy("idFilme", "desc")
      .then(response => {
        result = response;
      })
      .catch(erro => {
        console.log("Erro getFilmes Model => ", erro);
        return;
      });

    return result;
  }

  async createFilme(data) {
    var result;

    await db("filmes")
      .insert(data)
      .then(response => {
        result = response;
      })
      .catch(erro => {
        console.log("Erro createFilme Model => ", erro);
        return;
      });

    return result;
  }

  async findFilme(id) {
    var result;

    await db("filmes")
      .select("*")
      .where("idFilme", "=", id)
      .then(response => {
        result = response;
      })
      .catch(erro => {
        console.log("Erro findFilme Model => ", erro);
        return;
      });

    return result;
  }

  async deleteFilme(id) {
    var result;

    await db("sessoes")
      .where("sessoes.idFilme", "=", id)
      .del()
      .then(response => {
        result = response;
      })
      .catch(erro => {
        console.log("Erro deleteFilme Model => ", erro);
        return;
      });

    await db("filmes")
      .where("filmes.idFilme", "=", id)
      .del()
      .then(response => {
        result = response;
        console.log("Response :", response);
      })
      .catch(erro => {
        console.log("Erro deleteFilme2 Model => ", erro);
        return;
      });

    return result;
  }
}

module.exports = new filmeModel();
