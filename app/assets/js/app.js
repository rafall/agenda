angular.module('Agenda', [])

    .controller('ContactsShowController', function(userAuth, $scope, $http){

        $http.get('/users/1')
            .then(function(response) {
                $scope.user = response.data;
                userAuth.setUser($scope.user);

                $http.get('/users/' + userAuth.getUser().id + '/contacts')
                    .then(function(response) {
                        $scope.contacts = response.data;
                    });
            })
        
            
    })

    .controller('ContactsCreateController', function(userAuth){
        $scope.contact = {};

        $scope.saveContact = function() {
            $http.post('/users/' + userAuth.getUser().id + '/contacts', $scope.contact)
                .then(function() {
                    $scope.contact = {};
                });
        };
    });