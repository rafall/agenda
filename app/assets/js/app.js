angular.module('Agenda', [])
    .controller('ContactsShowController', function($scope, $http){
        $http.get('/users/1')
            .then(function(response) {
                $scope.user = response.data;

                $http.get('/users/' + $scope.user.id + '/contacts')
                    .then(function(response) {
                        $scope.contacts = response.data;
                    });
            });

        
    })
    .controller('ContactsCreateController', function(){
        $scope.contact = {};

        $scope.saveContact = function() {
            $http.post('/users/:userid/contacts', $scope.contact)
                .then(function() {
                    $scope.note = {};
                });
        };
    });