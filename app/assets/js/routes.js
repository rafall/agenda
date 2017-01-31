angular.module('Agenda')
	.config(function($routeProvider) {
		$routeProvider

			.when('/', {
				redirectTo: '/login'
			})

			.when('/login', {
				templateUrl: "assets/templates/login.html",
				controller: "LoginController"
			})

			.when('/register', {
				templateUrl: "assets/templates/register.html",
				controller: "RegisterController"
			})

			.when('/logout', {
				controller: "LogoutController"
			})

			.when('/users/:userid/contacts', {
				templateUrl: "assets/templates/contacts.html",
				controller: "ContactsShowController"
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