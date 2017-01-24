var User    = require('../models/user');
var _       = require('underscore');

var users = [];

// Testes
var firstUser = new User('Jeff', '1234', 'jeff@zeldman.com');
firstUser.addContact({id: 1, name: 'Alyssa Nicoll', email: 'alyssa@nicoll.com', phone: '55555555', photo: '/assets/images/avatar'});
firstUser.addContact({id: 2, name: 'Jordan Wade'  , email: 'jordan@wade.com'  , phone: '88888888'});
users.push(firstUser);
// Fim dos Testes

function findUser(id) {
	//console.log('Buscando usuário com id ' + id + '\n');
	var user = _.find(users, function(user) {
		return user.id === id;
	});

	return user;
}

// Posso criar um middleware que sempre pega o usuário que
// fez a requisição e colocar no request (ou não)
// Mas fica pra depois

module.exports = function(app) {

	app.get('/users/:id', function(request, response) {
		var user = findUser(parseInt(request.params.id, 10));
		
		if(!user) {
			console.log('Não achou usuário!\n');
			response.json({});
		} else {
			user = {id: user.id, name: user.name, email: user.email};
			response.json(user);	
		}
	});

	app.get('/users/:userid/contacts', function(request, response) {
		var user = findUser(parseInt(request.params.userid, 10));

		response.json(user.all());
	});

	app.post('/users/:userid/contacts', function(request, response) {
		var user = findUser(parseInt(request.params.userid, 10));

		if(request.body === {}) {
			response.sendStatus(400);
		} else {
			response.json(user.addContact(request.body));
		}
	});

	app.get('/users/:userid/contacts/:contactid', function(request, response) {
		var user 	  = findUser(parseInt(request.params.userid, 10));
		var contactID = parseInt(request.params.contactid, 10);
		response.json(user.get(contactID) || {});
	});

	app.put('/users/:userid/contacts/:contactid', function(request, response) {
		var user = findUser(parseInt(request.params.userid, 10));
        response.json(user.updateContact(parseInt(request.params.contactid), request.body));

	});

    app.delete('/users/:userid/contacts/:contactid', function(request, response) {
        var user = findUser(parseInt(request.params.userid, 10));
        response.json(user.delete(parseInt(request.params.contactid)));

    });
};