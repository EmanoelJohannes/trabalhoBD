const express = require ('express');
var bodyParser = require('body-parser');

const app = express();


// Seta as variaves "view engine" e "views" do express
app.set('view engine', 'ejs');
app.set('views', './src/views');

app.use(express.static(__dirname + '/public'));

app.use(bodyParser.urlencoded({extended: true}));

app.use(express.json());

app.use(require('./routes'));

app.listen (3333, ()=>{
    console.log("Conectado porta 3333");
});
