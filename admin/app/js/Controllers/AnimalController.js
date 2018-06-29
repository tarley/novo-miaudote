  (function() {
    'use strict';
    angular.module('miaudote.controller')

      .controller('AnimalController', function CadAnimalController($scope, Menu, CheckSession, Toast, $http, $location) {


        $scope.LoadDados = function() {
          Menu.LoadMenu();
          $http({
            method: 'GET',
            url: '../api/Instituicao.php?acao=GetInstituicao'
          }).then(function successCallback(response) {
            var e = response.data;
            if (e.sucesso) {
              $scope.Instituicoes = e.data;
            }
          }, function errorCallback(response) {
            Toast.ShowMessage("error", response);
          });
        }

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
            url: '../api/Animal.php?acao=BuscarTodos&retornarImagem=T'
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

          $scope.ExcluirAnimal = function(Animal) {
            $scope.NomeItem = Animal.NOM_ANIMAL;
            $scope.CodItem = Animal.COD_ANIMAL;

            $("#ConfirmarExclusao").modal("open");
          }

          $scope.ExcluirConfirmado = function(CodItem) {
            $http({
              method: 'POST',
              url: '../api/Animal.php?acao=ExcluirAnimal',
              data: { 'dados': [{ 'COD_ANIMAL': CodItem }] }
            }).then(function successCallback(response) {
              if (response.data.sucesso) {
                Toast.ShowMessage("success", response.data.mensagem);
                $location.path("/Animal");
                $scope.ListarAnimais();
              }
              else {
                Toast.ShowMessage("error", response.data.mensagem);
              }
            }, function errorCallback(response) {
              Toast.ShowMessage("error", response);
            });

          }
        }

      });

  })();
  