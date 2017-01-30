var _ = require('underscore');
var lastID = 0;

function UserException(message) {
	this.message = message;
	this.name = "UserException";
}

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
		var contact = _.find(contacts, function(contact) {
			return contact.id === id;
		});

		if(contact) {
			return contact;
		} else {
			throw new UserException('Contact not found!');
		}
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

	this.getPassword = function() {
		return password;
	}

	console.log('User created!\nID: ' + this.id) + '\n';
};

module.exports = User;