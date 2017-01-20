angular.module('Agenda')
	.config(function($routeProvider) {
		$routeProvider

			.when('/', {
				templateUrl: "assets/templates/contacts.html",
				controller: "ContactsShowController"
			})

			.when('/users/:userid/contacts/:id/edit', {
				templateUrl: "assets/templates/contactsEdit.html",
				controller: "ContactsEditController"
			});
	});