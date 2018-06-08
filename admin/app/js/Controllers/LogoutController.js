(function () {
    'use strict';
    angular.module('miaudote.controller')
            .controller('LogoutController', function LogoutController($scope, $http, Menu, CheckSession, $location, Toast) {
                $http({
                    method: 'GET',
                    url: '../api/Auth.php?acao=EncerrarSessao'
                }).then(function successCallback(response) {
                    var e = response.data;
                    if (e.sucesso) {
                        $("#menu_admin").css("display", "none");
                        setCookie("UsuarioLogado", "false");
                        $location.path("/");
                    }
                }, function errorCallback(response) {
                    Toast.ShowMessage("error", response);
                });

            });
})();