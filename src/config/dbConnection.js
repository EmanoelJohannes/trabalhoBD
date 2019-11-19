var data = ({
    client: 'mysql',
    connection: {
        host: 'localhost',
        user: 'root',
        password: null,
        database: 'trabalho_bd'
    }
});

var connection = require('knex')(data);

if (connection) console.log("Conectado ao MySQL!");

module.exports = connection;