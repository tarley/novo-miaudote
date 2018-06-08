(function () {
    'use strict';
    angular.module('miaudote.controller').controller('InstituicaoController', function InstituicaoController($scope, Menu, CheckSession, Toast, $http, $location) {
        Menu.LoadMenu();
        $(document).ready(function () {
            $('.phone').mask('(00)0000-0000');
        });
        
        $scope.LoadDados = function () {
            $http({
                method: 'GET',
                url: '../api/Instituicao.php?acao=GetCidades'
            }).then(function successCallback(response) {
                var e = response.data;
                if (e.sucesso) {
                    $scope.Cidades = e.data;
                }
            }, function errorCallback(response) {
                Toast.ShowMessage("error", response);
            });


        }

        $scope.CadastrarInstituicao = function () {
            $http({
                method: 'POST',
                url: '../api/Instituicao.php?acao=CriarInstituicao',
                data: {'dados': [{'nome': $scope.nome,
                            'telefone': $scope.telefone,
                            'email': $scope.email,
                            'tipo': $scope.tipo,
                            'cidade': $scope.cidade}]}
            }).then(function successCallback(response) {
                if (response.data.sucesso) {
                    Toast.ShowMessage("success", response.data.mensagem);
                    $location.path("/Instituicao");
                } else {
                    Toast.ShowMessage("warning", response.data.mensagem);
                }
            }, function errorCallback(response) {
                Toast.ShowMessage("error", response);
            });
        }


        $scope.PaginaAtual = 1;
        $scope.BtnProximaPagina = true;
        $scope.BtnPaginaAnterior = true;
        $scope.ListarInstituicoes = function () {
            Menu.LoadMenu();
            $http({
                method: 'GET',
                url: '../api/Instituicao.php?acao=GetInstituicao&Pagina=' + $scope.PaginaAtual
            }).then(function successCallback(response) {
                var e = response.data;
                if (e.sucesso) {
                    $scope.Instituicoes = e.data;
                    $scope.TotalRegistros = e.TotalRegistros;
                    $scope.QuantidadePaginas = e.QuantidadePaginas;

                    if ($scope.PaginaAtual >= $scope.QuantidadePaginas)
                        $scope.BtnProximaPagina = false;
                    else
                        $scope.BtnProximaPagina = true;

                    if ($scope.PaginaAtual <= 1)
                        $scope.BtnPaginaAnterior = false;
                    else
                        $scope.BtnPaginaAnterior = true;

                } else {

                }
            }, function errorCallback(response) {
                //alert("aqui");
               // Toast.ShowMessage("error", e.mensagem);
            });

            $scope.ProximaPagina = function () {
                $scope.PaginaAtual += 1;
                $scope.ListarInstituicoes();
            }

            $scope.PaginaAnterior = function () {
                $scope.PaginaAtual -= 1;
                $scope.ListarInstituicoes();
            }

            $scope.ExcluirInstituicao = function (Instituicao) {
                $scope.NomeItem = Instituicao.NOM_INSTITUICAO;
                $scope.CodItem = Instituicao.COD_INSTITUICAO;

                $("#ConfirmarExclusao").modal("open");
            }

            $scope.ExcluirConfirmado = function (CodItem) {
                $http({
                    method: 'POST',
                    url: '../api/Instituicao.php?acao=DeletarInstituicao',
                    data: {'dados': [{'COD_INSTITUICAO': CodItem}]}
                }).then(function successCallback(response) {
                    if (response.data.sucesso) {
                        Toast.ShowMessage("success", response.data.mensagem);
                        $location.path("/Instituicao");
                        $scope.ListarInstituicoes();
                    } else {
                        Toast.ShowMessage("error", response.data.mensagem);
                    }
                }, function errorCallback(response) {
                    Toast.ShowMessage("error", response);
                });

            }
        }
    });
})();