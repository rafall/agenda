angular.module('Agenda')
    .factory('userAuth', function($http, $cookies){
        var loggedUser = undefined;
        var token = undefined;

        return {
            getUser: function() {
                if(loggedUser === undefined) {
                    var user = $cookies.getObject('user');
                    if(user) {
                        loggedUser = user;
                    } else {
                        console.log('Cannot get user from cookies');
                    }
                }

                return loggedUser;
            },

            isLogged: function() {
                return loggedUser === undefined ? false : true;
            },

            getToken: function() {
                return token ? token : $cookies.get('token');
            },

            logUser: function(user) {

                return $http.post('/login', user)
                    .then(function(response) {
                        if(response.data.success) {
                            loggedUser = response.data.user;
                            token = response.data.token;
                            $cookies.put('token', token);
                            $cookies.putObject('user', loggedUser);
                        } else {
                            console.log(response.data.message);
                            loggedUser = undefined;
                        }

                        return loggedUser;
                        
                    });
            },

            logout: function() {
                loggedUser = undefined;
                token = undefined;
                $cookies.remove('token');
                $cookies.remove('user');
            }

        };

    });