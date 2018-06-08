angular.module("miaudote.controller").service("Menu", function () {
    this.LoadMenu = function () {
        return $("#menu_admin").css("display", "block");
    };
})

        .service("Toast", function () {

            this.ShowMessage = function (tipo, mensagem) {
                toastr.options = {
                    "closeButton": false,
                    "debug": false,
                    "newestOnTop": false,
                    "progressBar": false,
                    "positionClass": "toast-top-right",
                    "preventDuplicates": false,
                    "onclick": null,
                    "showDuration": "300",
                    "hideDuration": "1000",
                    "timeOut": "5000",
                    "extendedTimeOut": "1000",
                    "showEasing": "swing",
                    "hideEasing": "linear",
                    "showMethod": "fadeIn",
                    "hideMethod": "fadeOut"
                }
                toastr[tipo](mensagem);
            }
        })

        .service("CheckSession", function ($rootScope, $http, $location) {
            ChecarSessao();
            setInterval(function () {
                ChecarSessao();
            }, 15000);

            $rootScope.UsuarioLogado = ChecarSessao();

            function ChecarSessao() {
                $http({
                    method: 'GET',
                    url: '../api/Auth.php?acao=ChecarSessao'
                }).then(function successCallback(response) {
                    var e = response.data;
                    if (e.sucesso) {
                        return e;
                    } else { 
                        if(getCookie() === " UsuarioLogado=true"){
                            toastr["error"](e.mensagem);
                        }
                        setCookie("UsuarioLogado", "false");
                        $("#menu_admin").css("display", "none");
                        $location.path('/');
                       
                    }
                }, function errorCallback(response) {

                });
            }

        });