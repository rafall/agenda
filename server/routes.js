var express 	= require('express');
var app 		= express();
var bodyParser 	= require('body-parser');

app.use('/', express.static('app/'));
app.use(bodyParser.json());
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// Para todas as rotas, verifica se o request é seguro
app.all('*', function(request, response, next) {
    if(request.secure) {
        return next();
    }
    //TODO verificar se isso funciona
    response.redirect('https://localhost:3443/');
});

app.get('/', function(request, response) {
	response.sendFile('index.html', {root: __dirname + '/../app/views'});
});

require('./routes/user')(app);

module.exports = app;