angular.module('Agenda', ['ngRoute', 'ngResource'])

    .controller('ContactsShowController', function(userAuth, $scope, $http){

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

    .controller('ContactsCreateController', function(userAuth, $scope, $http){
        $scope.contact = {};

        $scope.saveContact = function() {
            $http.post('/users/' + userAuth.getUser().id + '/contacts', $scope.contact)
                .then(function() {
                    console.log('Contato ' + $scope.contact.name + ' adicionado.\n');
                    $scope.contact = {};
                });
        };
    })

    .controller('ContactsEditController', function(Contact, $scope, $routeParams, $http, $location) {
        $http.get('/users/' + $routeParams.userid + '/contacts/' + $routeParams.contactid)
            .then(function(response) {
                $scope.contact = response.data;
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