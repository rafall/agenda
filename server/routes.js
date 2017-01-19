var express 	= require('express');
var app 		= express();
var bodyParser 	= require('body-parser');

app.use('/', express.static('app/'));
app.use(bodyParser.json());

app.get('/', function(request, response) {
	response.sendFile('index.html', {root: __dirname + '/../app/views'});
});

require('./routes/user')(app);

module.exports = app;