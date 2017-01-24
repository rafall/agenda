angular.module('Agenda')
	.config(function($routeProvider) {
		$routeProvider

			.when('/', {
				templateUrl: "assets/templates/contacts.html",
				controller: "ContactsShowController"
			})

			.when('/login', {
				templateUrl: "assets/templates/login.html",
				controller: "LoginController"
			})

			.when('/users/:userid/contacts/new', {
				templateUrl: "assets/templates/contactsNew.html",
				controller: "ContactsCreateController"
			})

			.when('/users/:userid/contacts/:contactid/edit', {
				templateUrl: "assets/templates/contactsEdit.html",
				controller: "ContactsEditController"
			});
	});