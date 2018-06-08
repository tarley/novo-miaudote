(function () {
    'use strict';
    angular.module('miaudote.controller')
            .controller('MenuController', function MenuController($scope, Toast,$http, CheckSession) {
                $http({
                    method: 'GET',
                    url: '../api/Auth.php?acao=ChecarSessao'
                }).then(function successCallback(response) {
                    var e = response.data;
                    if (e.sucesso) {
                         $scope.nome = e.data.NOM_USUARIO;
                        if (e.data.TIPO === "A")
                            $scope.MenuRestrito = true;
                        else
                            $scope.MenuRestrito = false;
                    }
                }, function errorCallback(response) {
                    Toast.ShowMessage("error", response);
                });
            });

})();