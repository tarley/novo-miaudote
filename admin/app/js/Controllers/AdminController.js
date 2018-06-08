(function () {
    'use strict';
    angular.module('miaudote.controller')

            .controller('AdminController', function CadUsuarioController($scope, Menu, CheckSession) {
              
                Menu.LoadMenu();
            });


})();