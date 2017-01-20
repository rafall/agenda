angular.module('Agenda')
	.factory('userAuth', function($http){
		var user = {};
		
		return {
			getUser: function() {
				return user;
			},

			setUser: function(u) {
				user = u;
			}

		};

	});