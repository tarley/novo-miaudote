var app = angular.module("miaudote_admin", ['ngRoute', 'miaudote.controller']);
app.config(function ($routeProvider) {
    $routeProvider
            .when('/', {
                templateUrl: 'app/pages/Home/_login.html',
                controller: 'LoginController',
            })
            .when('/home', {
                templateUrl: 'app/pages/Home/_admin.html',
                controller: 'AdminController'
            })

            .when('/Animal/CadastroAnimal', {
                templateUrl: 'app/pages/Animal/_cadastro_animal.html',
                controller: 'AnimalController'
            })
            .when('/Animal', {
                templateUrl: 'app/pages/Animal/_listagem_animal.html',
                controller: 'AnimalController'
            })


            .when('/Instituicao/CadastroInstituicao', {
                templateUrl: 'app/pages/Instituicao/_cadastro_instituicao.html',
                controller: 'InstituicaoController'
            })
            .when('/Instituicao', {
                templateUrl: 'app/pages/Instituicao/_listagem_instituicao.html',
                controller: 'InstituicaoController'
            })


            .when('/Usuario/CadastroUsuario', {
                templateUrl: 'app/pages/Usuario/_cadastro_usuario.html',
                controller: "UsuarioController"
            })

            .when('/Usuario', {
                templateUrl: 'app/pages/Usuario/_listagem_usuario.html',
                controller: "UsuarioController"
            })

            .when('/MinhaConta', {
                templateUrl: 'app/pages/MinhaConta/_minha_conta.html',
                controller: "MinhaContaController"
            })
            
             .when('/Logout', {
                templateUrl: 'app/pages/Logout/Logout.html',
                controller: "LogoutController"
            })
  
            .otherwise({
                redirectTo: '/home'
            });

})
    .directive('fileInput', function() {
        return {
            restrict: 'A',
            scope: {
                fileInput: "="
            },
            link: function(scope, element) {
                element.bind("change", function(changeEvent) {
                    var reader = new FileReader();
                    reader.onload = function(loadEvent) {
                        scope.$apply(function() {
                            scope.fileInput = loadEvent.target.result;
                        });
                    };
                    reader.readAsDataURL(changeEvent.target.files[0]);
                });
            }
        };
    });  

app.run(function ($location, $rootScope) {
    //Rotas que necessitam do login
    $rootScope.$on('$locationChangeStart', function () {
        if (getCookie() === " UsuarioLogado=true") {
            $.get("../api/Auth.php?acao=ChecarSessao", function (e) {
                if (e.sucesso) {
                    $rootScope.UsuarioLogado = e.data;
                } else {
                    if (getCookie() === " UsuarioLogado=true") {
                        toastr["error"](e.mensagem);
                    }
                    setCookie("UsuarioLogado", "false");
                    $("#menu_admin").css("display", "none");
                    $location.path('/');
                }
            });
        } else {
            $location.path('/');
        }
    });
});


function getCookie() {
    var _c = String(document.cookie).split(";");
    return _c[3];
}

function setCookie(k, v) {
    var tempodevida = new Date();
    tempodevida.setTime(tempodevida + (1000 * 60 * 60 * 24 * 2));
    var expira = tempodevida;
    var path = "/";

    var d = new Date();
    d.setTime(d.getTime() + (expira * 1000));

    document.cookie = escape(k) + "=" + escape(v) + "; expires=" + d + "; path=" + path;
}

document.addEventListener('DOMContentLoaded', function() {
    var elems = document.querySelectorAll('.modal');
    var instances = M.Modal.init(elems, options);
  });
  


  
