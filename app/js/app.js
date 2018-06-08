var app = angular.module("miaudote_js", ['ngRoute', 'miaudote.controller']);
app.config(function($routeProvider) {
    $routeProvider
        .when('/', {
            templateUrl: 'app/pages/inicial/_home.html',
            controller: 'MainController'
        })
        .when('/admin', {
            templateUrl: 'app/pages/gerencial/admin.html',
            controller: 'AdminController'
        })
        .when('/_cadastro-animal', {
            templateUrl: 'app/pages/gerencial/_cadastro-animal.html',
            controller: 'CadAnimalController'
        })
        .when('/_login', {
            templateUrl: 'app/pages/gerencial/_login.html',
            controller: 'LoginController'
        })
        .when('/_instituicao', {
            templateUrl: 'app/pages/gerencial/_cadastro_instituicao.html',
            controller: 'InstituicaoController'
        })
        .when('/_cadastro-Usuario', {
            templateUrl: 'app/pages/gerencial/_cadastro-Usuario.html',
            controller: "CadUsuarioController"
        })
        
        .otherwise({
            redirectTo: '/'
        });
});
