angular.module('Agenda')
    .factory('userAuth', function($http, $cookies){
        var loggedUser = undefined;
        var token = undefined;

        //TODO Melhorar essa gambiarra
        //que vergonha
        /*if($cookies.getObject('user')) {
            loggedUser = $cookies.getObject('user');
            token = $cookies.get('token');
        }*/

        return {
            getUser: function() {
                if(loggedUser !== undefined) {
                    return loggedUser;    
                } else {
                    var user = $cookies.getObject('user');
                    if(user) {
                        loggedUser = user;
                        return user;
                    } else {
                        console.log('Cannot get user');
                        return undefined;
                    }
                }
                
            },

            isLogged: function() {
                return loggedUser === undefined ? false : true;
            },

            setUser: function(u) {
                loggedUser = u;
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
                            return loggedUser;
                        } else {
                            console.log(response.data.message);
                            return undefined;
                        }
                        
                    });
                /*
                $http.get('/users/' + id.toString())
                    .then(function(response) {
                        user = response.data;
                        console.log('Logando user id: ' + user.id);
                        return user;
                    });*/
            },

            logout: function() {
                loggedUser = undefined;
                token = undefined;
                $cookies.remove('token');
                $cookies.remove('user');
            }

        };

    });