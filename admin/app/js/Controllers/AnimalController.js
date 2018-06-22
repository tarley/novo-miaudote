  (function() {
      'use strict';
      angular.module('miaudote.controller')

          .controller('AnimalController', function CadAnimalController($scope, $http, $location, Toast) {
              
               $scope.CadastrarAnimal = function() {
                  $http({
                      method: 'POST',
                      url: "../api/Animal.php?acao=CadastrarAnimal",
                      data: {'dados': $scope.animal}
                      }).then(function successCallback(response) {
                      if (response.data.sucesso) {
                          Toast.ShowMessage("success", response.data.mensagem);
                          $location.path("/Animal");
                      }
                      else {
                          Toast.ShowMessage("warning", response.data.mensagem);
                      }
                  }, function errorCallback(response) {
                      Toast.ShowMessage("error", response);
                  });
              }

          });

  })();
  