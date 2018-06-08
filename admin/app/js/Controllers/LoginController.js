var app = angular.module('miaudote.controller', [])

app.controller('LoginController', function LoginController($scope, $rootScope, Toast) {
    $scope.Logar = function () {
        var email = $scope.email;
        var senha = $scope.senha;

        $.ajax({
            type: "POST",
            url: "../api/Auth.php?acao=CriarSessao",
            data: "email=" + email + "&senha=" + senha,
            success: function (e) {
                if (e.sucesso) {
                    setCookie("UsuarioLogado", "true");
                    $rootScope.UsuarioLogado = e;
                    window.location = "/admin/#!/home";
                    location.reload();
                } else {
                    Toast.ShowMessage("error", e.mensagem);
                }
            }
        });
    }
})

