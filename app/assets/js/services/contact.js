angular.module('Agenda')
	.factory('Contact', function($resource){
		return $resource('/users/:userid/contacts/:id', {userid: '@userid', id: '@id'}, {
			update: {
				method: 'PUT'
			}
		});
	});