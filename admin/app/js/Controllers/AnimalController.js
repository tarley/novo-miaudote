  (function() {
      'use strict';
      angular.module('miaudote.controller')

          .controller('AnimalController', function CadAnimalController($scope, Menu, CheckSession, Toast, $http, $location) {

              $scope.CadastrarAnimal = function() {
                  $http({
                      method: 'POST',
                      url: "../api/Animal.php?acao=CadastrarAnimal",
                      data: { 'dados': $scope.animal }
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

              $scope.ListarAnimais = function() {
                  Menu.LoadMenu();
                  $http({
                      method: 'GET',
                      url: '../api/Animal.php?acao=BuscarTodos='
                  }).then(function successCallback(response) {
                      var e = response.data;
                      if (e.sucesso) {
                          $scope.Animal = e.data;
                      }
                      else {

                      }
                  }, function errorCallback(response) {
                      //alert("aqui");
                      // Toast.ShowMessage("error", e.mensagem);
                  });
              }

          });

  })();
  