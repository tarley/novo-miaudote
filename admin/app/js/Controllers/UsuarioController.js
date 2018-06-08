(function () {
    'use strict';
    angular.module('miaudote.controller').controller('UsuarioController', function UsuarioController($scope, Menu, CheckSession, Toast, $http, $location) {
        Menu.LoadMenu();
        $scope.CadastrarUsuario = function () {
            $http({
                method: 'POST',
                url: '../api/Usuario.php?acao=CriarUsuario',
                data: {'dados':[{ 'nome' : $scope.nome,
                        'email': $scope.email,
                        'senha': $scope.senha,
                        'repetirSenha':$scope.repetirSenha}]}
            }).then(function successCallback(response) {
                if (response.data.sucesso) {
                    Toast.ShowMessage("success", response.data.mensagem);
                    $location.path("/Usuario");
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
        $scope.ListarUsuarios = function(){
            $http({
                    method: 'GET',
                    url: '../api/Usuario.php?acao=GetUsuarios&Pagina='+$scope.PaginaAtual
                }).then(function successCallback(response) {
                    var e = response.data;
                    if (e.sucesso) {
                     $scope.Usuarios = e.data;
                     $scope.TotalRegistros = e.TotalRegistros;
                     $scope.QuantidadePaginas = e.QuantidadePaginas;
                     
                     if($scope.PaginaAtual >= $scope.QuantidadePaginas)
                         $scope.BtnProximaPagina = false;
                     else
                          $scope.BtnProximaPagina = true;
                      
                      if($scope.PaginaAtual <= 1)
                          $scope.BtnPaginaAnterior = false;
                      else
                          $scope.BtnPaginaAnterior = true;
                      
                    } else { 
                   
                    }
                }, function errorCallback(response) {
                        Toast.ShowMessage("error", e.mensagem);
                });
              
            $scope.ProximaPagina = function(){
                $scope.PaginaAtual += 1;
                $scope.ListarUsuarios();
            }
            
            $scope.PaginaAnterior = function(){
                $scope.PaginaAtual -= 1;
                $scope.ListarUsuarios();
            }
            
            $scope.ExcluirUsuario = function(Usuario){
                $scope.NomeItem = Usuario.NOM_USUARIO;
                $scope.CodItem = Usuario.COD_USUARIO;
                
                $("#ConfirmarExclusao").modal("open");
            }
            
            $scope.ExcluirConfirmado = function(CodItem){
                $http({
                method: 'POST',
                url: '../api/Usuario.php?acao=DeletarUsuario',
                data: {'dados':[{ 'COD_USUARIO' : CodItem}]}
            }).then(function successCallback(response) {
                if (response.data.sucesso) {
                    Toast.ShowMessage("success", response.data.mensagem);
                    $location.path("/Usuario");
                    $scope.ListarUsuarios();
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