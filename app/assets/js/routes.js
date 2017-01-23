angular.module('Agenda')
	.config(function($routeProvider) {
		$routeProvider

			.when('/', {
				templateUrl: "assets/templates/contacts.html",
				controller: "ContactsShowController"
			})

			.when('/users/:userid/contacts/:contactid/edit', {
				templateUrl: "assets/templates/contactsEdit.html",
				controller: "ContactsEditController"
			});
	});