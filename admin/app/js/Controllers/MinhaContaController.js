(function(){
    'use strict';
    angular.module('miaudote.controller')
	
	 .controller('MinhaContaController', function UsuarioController($scope, Menu, CheckSession) {
			Menu.LoadMenu();
	 });
	
})();