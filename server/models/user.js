var _ = require('underscore');
var lastID = 0;

function User(name, password, email) {

	var contacts 	= []; // Tem nome, email, telefone
	var password 	= password;

	this.name		= name;
	this.email		= email;
	this.id 		= ++lastID;
	
	this.addContact = function(contact) {
		contacts.push(contact);
		return contact;
	};

	this.get = function(id) {
		return _.find(contacts, function(contact) {
			return contact.id === id;
		});
	};

	this.all = function() {
		return contacts;
	};

	console.log('Usuário criado com ID: ' + this.id) + '\n';
};

module.exports = User;