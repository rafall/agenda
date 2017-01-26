angular.module('Agenda', ['ngRoute', 'ngResource'])

    .controller('LoginController', function($scope){
        $scope.user = {};
    })

    .controller('ContactsShowController', function(userAuth, $scope, $http){
        //TODO precisa modificar depois que tiver login
        $http.get('/users/1') 
            .then(function(response) {
                $scope.user = response.data;
                userAuth.setUser($scope.user);

                $http.get('/users/' + userAuth.getUser().id + '/contacts')
                    .then(function(response) {
                        $scope.contacts = response.data;
                    });
            });
    })

    .controller('ContactsCreateController', function(userAuth, $scope, $http, $location){
        $scope.contact = {};

        $scope.saveContact = function() {
            var formData = new FormData;

            for(key in $scope.contact) {
                formData.append(key, $scope.contact[key]);
            }
            var file = $('#file')[0].files[0];

            // Verifica se tem um arquivo e a extensão dele
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
                    'Content-Type': undefined
                }
            }).then(function() {
                    console.log('Contat ' + $scope.contact.name + ' added.\n');
                    $scope.contact = {};
                    $location.path('/');
                });
        };
    })

    .controller('ContactsEditController', function(Contact, $scope, $routeParams, $http, $location) {
        $http.get('/users/' + $routeParams.userid + '/contacts/' + $routeParams.contactid)
            .then(function(response) {

                if(response.data) {
                    $scope.contact = response.data;
                } else {
                    $location.path('/');
                }
                
            });

        $scope.saveContact = function(contact) {
            $http.put('/users/' + $routeParams.userid + '/contacts/' + $routeParams.contactid, $scope.contact)
                .then(function() {
                    $location.path('/');
                });
        };

        $scope.deleteContact = function() {
            $http.delete('/users/' + $routeParams.userid + '/contacts/' + $routeParams.contactid)
                .then(function() {
                    $location.path('/');
                });
        };

    });