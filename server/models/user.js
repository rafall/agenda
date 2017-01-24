var _ = require('underscore');
var lastID = 0;

function User(name, password, email) {

	var contacts 	  = []; // Tem nome, email, telefone
	var password 	  = password;
	var lastContactID = 0;
	this.name		  = name;
	this.email		  = email;
	this.id 		  = ++lastID;
	
	this.addContact = function(contact) {
		contact.id = ++lastContactID;
		if(!contact.photo){
			contact.photo = '/assets/images/avatar';
		}
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

	this.delete = function(id) {
		var deletedContact;
	    for(var i=0, l=contacts.length; i < l; i++) {
	      if(contacts[i].id === id){
	        deletedContact = contacts[i];
	        contacts.splice(i, 1);
	        break;
	      }
	    }
	    return deletedContact;
	};

	this.updateContact = function(id, contact) {
		var updatedContact = {};
		for(var i=0, l=contacts.length; i < l; i++) {
	      if(contacts[i].id === id){
	        contacts[i] = contact;
	        break;
	      }
	    }

	    return updatedContact;
	};

	console.log('Usuário criado com ID: ' + this.id) + '\n';
};

module.exports = User;