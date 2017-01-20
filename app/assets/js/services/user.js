angular.module('Agenda')
	.factory('userAuth', function($http){
		var user = {};
		
		return {
			getUser: function() {
				return user;
			},

			setUser: function(u) {
				user = u;
			},

			logUser: function(id) {
				$http.get('/users/' + id.toString())
					.then(function(response) {
						user = response.data;
						console.log('Logando user id: ' + user.id);
						return user;
					});
			}

		};

	});