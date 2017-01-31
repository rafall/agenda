angular.module('Agenda', ['ngRoute', 'ngResource', 'ngCookies'])

    .controller('LoginController', function(userAuth, $scope, $location, $cookies){
        $scope.user = {};
        //TODO verificar se tem como fazer isso de outro jeito
        if(userAuth.getUser()) {
            var user = userAuth.getUser();
            $location.path('/users/'+user.id+'/contacts');
        }

        $scope.login = function() {
            var userPromise = userAuth.logUser($scope.user);

            userPromise.then(function(response) {
                var user = response
                if(user) {
                    $location.path('/users/' + user.id + '/contacts');
                } else {
                    //TODO Consertar isso aqui
                    alert('Login error');
                }
            });

        }
    })

    .controller('LogoutController', function(userAuth, $location) {
        userAuth.logout();
        $location.path('/login');
    })

    .controller('RegisterController', function($scope, $location, $http){
        $scope.user = {};

        $scope.registerUser = function() {
            var req;
            var formData = new FormData;

            for(key in $scope.user) {
                formData.append(key, $scope.user[key]);
            }

            req = {
                method: 'POST',
                url: '/register',
                headers: {
                    'Content-Type': undefined
                },
                data: formData
            };

            $http(req)
                .then(function() {
                        $location.path('/login');
                    });
        };
    })

    //TODO Fazer função que gera a requisição pra ficar menor esse treco
    .controller('ContactsShowController', function(userAuth, $scope, $http, $location){
        $scope.user = userAuth.getUser();
        
        if(!$scope.user) {
            $location.path('/login');
        }

        var req = {
            method: 'GET',
            url: '/users/' + userAuth.getUser().id + '/contacts',
            headers: {
                'x-access-token' : userAuth.getToken()
            }
        };

        $http(req)
            .then(function(response) {
                $scope.contacts = response.data;
            });

        $scope.logout = function() {
            userAuth.logout();
            $location.path('/login');
        };
    })

    .controller('ContactsCreateController', function(userAuth, $scope, $http, $location){
        $scope.contact = {};

        if(!userAuth.isLogged()) {
            $location.path($location.path('/login'));
        }

        $scope.saveContact = function() {
            var formData = new FormData;

            for(key in $scope.contact) {
                formData.append(key, $scope.contact[key]);
            }
            var file = $('#file')[0].files[0];

            // Verifica se tem um arquivo e a extensão permitida
            if(file) {
                console.log(file);
                var extn = file.name.split(".").pop();
                if (extn === 'png' || extn === 'jpg' || extn === 'jpeg') {
                    formData.append('photo', file);
                } else {
                    console.log("File extension not allowed!");
                }
                //TODO precisa ter um jeito de avisar que não pode a extensão que ele tentou
                
            }

            $http.post('/users/' + userAuth.getUser().id + '/contacts', formData, {
                transformRequest: angular.identity,
                headers: {
                    'Content-Type': undefined,
                    'x-access-token': userAuth.getToken()
                }
            }).then(function() {
                    console.log('Contact ' + $scope.contact.name + ' added.\n');
                    $scope.contact = {};
                    $location.path('/');
                });
        };
    })

    .controller('ContactsEditController', function(Contact, userAuth, $scope, $routeParams, $http, $location) {
        if(!userAuth.isLogged()) {
            $location.path('/login');
        }

        var req = {
            method: 'GET',
            url: '/users/' + $routeParams.userid + '/contacts/' + $routeParams.contactid,
            headers: {
                'x-access-token' : userAuth.getToken()
            }
        };
        $http(req)
            .then(function(response) {
                // Se o contato existir ele carrega o contato, senão, redireciona para o início
                response.data ? $scope.contact = response.data : $location.path('/');
            });

        $scope.saveContact = function(contact) {
            var req = {
                method: 'PUT',
                url: '/users/' + $routeParams.userid + '/contacts/' + $routeParams.contactid,
                headers: {
                    'x-access-token' : userAuth.getToken()
                },
                data: $scope.contact
            };
            
            $http(req)
                .then(function() {
                    $location.path('/');
                });
        };

        $scope.deleteContact = function() {
            var req = {
                method: 'DELETE',
                url: '/users/' + $routeParams.userid + '/contacts/' + $routeParams.contactid,
                headers: {
                    'x-access-token' : userAuth.getToken()
                }
            };

            $http(req)
                .then(function() {
                    $location.path('/');
                });
        };

    });