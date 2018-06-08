var app = angular.module('miaudote.controller', [])

    .directive('fileModel', ['$parse', function ($parse) {
            return {
               restrict: 'A',
               link: function(scope, element, attrs) {
                  var model = $parse(attrs.fileModel);
                  var modelSetter = model.assign;
                  
                  element.bind('change', function(){
                     scope.$apply(function(){
                        modelSetter(scope, element[0].files[0]);
                     });
                  });
               }
            };
         }])


    .controller('MainController', function MainController($scope) {

        $scope.init = function() {
            $scope.filtro = {};
            $scope.pet = {};

            $.ajax({
                type: "GET",
                url: "api/Animal.php?acao=BuscarTodos",
                success: function(e) {
                    $scope.listaPets = e.data;
                }
            });


            $scope.listaPetsAleatorios = listarPetsAleatorios();
        }

        $scope.opcoesIdade = [
            { name: 'Todas', value: 'Todas' },
            { name: 'Até 1 ano (Filhote)', value: 'Filhote' },
            { name: '1 a 8 anos (Adulto)', value: 'Adulto' },
            { name: 'Acima de 8 anos (Idoso)', value: 'Idoso' }
        ];

        $scope.opcoesUf = [
            { name: 'Todos', value: 'Todos' },
            { name: 'MG', value: 'MG' },
            { name: 'SP', value: 'SP' },
            { name: 'RJ', value: 'RJ' }
        ];

        $scope.opcoesCidade = [
            { name: 'Todas', value: 'Todas' },
            { name: 'Belo Horizonte', value: 'Belo Horizonte' },
            { name: 'São Paulo', value: 'São Paulo' },
            { name: 'Rio de Janeiro', value: 'Rio de Janeiro' }
        ];


        $scope.filtrar = function() {
            var listaPets = listarPets();

            var value = $scope.filtro.nome;

            if (value && value.trim().length > 0)
                listaPets = listaPets.filter(function(pet) {
                    return pet.nome.toUpperCase().indexOf(value.toUpperCase()) !== -1;
                });

            value = $scope.filtro.especie;

            if (value && value != 'Todos')
                listaPets = listaPets.filter(function(pet) {
                    return pet.especie == value;
                });

            value = $scope.filtro.uf;

            if (value && value != 'Todos')
                listaPets = listaPets.filter(function(pet) {
                    return pet.uf == value;
                });

            value = $scope.filtro.cidade;

            if (value && value != 'Todas')
                listaPets = listaPets.filter(function(pet) {
                    return pet.cidade == value;
                });


            if ($scope.filtro.porteP || $scope.filtro.porteM || $scope.filtro.porteG)
                listaPets = listaPets.filter(function(pet) {
                    return ($scope.filtro.porteP && pet.porte == 'pequeno') ||
                        ($scope.filtro.porteM && pet.porte == 'médio') ||
                        ($scope.filtro.porteG && pet.porte == 'grande');
                });

            value = $scope.filtro.genero;

            if (value && value != 'Todos')
                listaPets = listaPets.filter(function(pet) {
                    return pet.genero == value;
                });

            value = $scope.filtro.idade;

            if (value && value != 'Todas')
                listaPets = listaPets.filter(function(pet) {
                    if (value == 'Filhote')
                        return pet.idadeEmMeses <= 12;
                    else if (value == 'Adulto')
                        return pet.idadeEmMeses > 12 && pet.idadeEmMeses <= 96;
                    else
                        return pet.idadeEmMeses > 96;
                });

            $scope.listaPets = listaPets;
        }

        //Aplicando os Modais
        $scope.modal = function() {
            $(document).ready(function() {
                $('#modal1').modal('open');
            });
        }

        $scope.modal = function() {
            $(document).ready(function() {
                $('#modal1').modal('open');
            });
        }
        $scope.modal = function(pet) {
            $scope.pet = pet;

            $(document).ready(function() {
                $('#modal3').modal('open');
            });
        }

        $scope.getGenero = function(pet) {
            if (pet.genero == undefined)
                return "";

            return pet.genero == 'M' ? 'Macho' : 'Femea';
        }

        $scope.isCastrado = function(pet) {
            var sufixo;

            if (pet.castrado == 'M')
                sufixo = 'o';

            if (pet.genero == 'F') {
                sufixo = 'a';
            }

            return (pet.castrado ? 'castrad' : 'não castrad') + sufixo;
        }

        $scope.getIdade = function(pet) {
            if (pet.idadeEmMeses == undefined || pet.idadeEmMeses == null || pet.idadeEmMeses == 0)
                return "";

            var anos = Math.floor(pet.idadeEmMeses / 12);
            var meses = pet.idadeEmMeses % 12;

            var retorno = "";

            if (anos >= 1)
                retorno += anos + " ano" + (anos > 1 ? 's' : '');
            if (meses >= 1)
                retorno += (retorno != '' ? ' e ' : '') + meses + " mes" + (meses > 1 ? 'es' : '');

            return retorno;
        }

        $scope.configSlides = function() {
            $(document).ready(function() {
                $('.parallax').parallax();
                $('.slider').slider();
            });
        }

        $scope.configParceiros = function() {
            $(document).ready(function() {
                $('.slider1').bxSlider({
                    slideWidth: 180,
                    minSlides: 2,
                    maxSlides: 5,
                    slideMargin: 5
                });
            });
        }

        $scope.configFiltro = function() {
            $(document).ready(function() {
                $('select').material_select();
            });
        }

        $scope.configModal = function() {
            $(document).ready(function() {
                $('.modal').modal();
            });
        }

    })

    .controller('AdminController', function AdminController($scope) {

    })

    .controller('CadAnimalController', function CadAnimalController($scope, $http) {

        $scope.CadastrarAnimal = function() {

            var fd = new FormData();
            
            fd.append('nome', $scope.nome);
            fd.append('sexo', $scope.sexo);
            fd.append('especie', $scope.especie);
            fd.append('castrado', $scope.castrado);
            fd.append('idade', $scope.idade);
            fd.append('porte', $scope.porte);
            fd.append('instituicao', $scope.instituicao);
            fd.append('observacao', $scope.observacao);
            fd.append('temperamento', $scope.temperamento);
            fd.append('file', file);
            
               $http.post('api/Animal.php?acao=CadastrarAnimal', fd)
            
               .success(function(){
                   $("#mensagem").html("<div class=\"col-md-12\" style=\"border:1px solid #b3e096; background-color:#a2db7f; border-radius:4px;\">" + e.mensagem + "</div>");
                        window.location = "/#!/admin";
               })
            
               .error(function(){
                   $("#mensagem").html("<div class=\"col-md-12\" style=\"border:1px solid #efa39b; background-color:#f7ded7; border-radius:4px;\">" + e.mensagem + "</div>");
               });
           
           /*
            $.ajax({
                type: "POST",
                url: "api/Animal.php?acao=CadastrarAnimal",
                data: "nome=" + nome + "&sexo=" + sexo + "&especie=" + especie + "&castrado=" + castrado + "&idade=" + idade + "&porte=" + porte + "&instituicao=" + instituicao + "&observacao=" + observacao + "&temperamento=" + temperamento,
                sucess: function(e) {
                    if (e.sucesso) {
                        
                    }
                    else {
                        
                    }
                }
            });
            */
        }
    })

    .controller('LoginController', function LoginController($scope) {

        $scope.Autenticacao = function() {
            var email = $scope.email;
            var senha = $scope.senha;

            $.ajax({
                type: "POST",
                url: "api/Auth.php?acao=CriarSessao",
                data: "email=" + email + "&senha=" + senha,
                success: function(e) {
                    if (e.sucesso) {
                        $("#mensagem").html("<div class=\"col-md-12\" style=\"border:1px solid #b3e096; background-color:#a2db7f; border-radius:4px;\">" + e.mensagem + "</div>");
                        window.location = "/#!/admin";
                    }
                    else {
                        $("#mensagem").html("<div class=\"col-md-12\" style=\"border:1px solid #efa39b; background-color:#f7ded7; border-radius:4px;\">" + e.mensagem + "</div>");
                    }
                }
            });
        }
    })

    .controller('InstituicaoController', function InstituicaoController($scope) {

    })

    .controller('CadUsuarioController', function CadUsuarioController($scope) {

        $scope.CadastrarUsuario = function() {
            var nomeUsuario = $scope.nomeUsuario;
            var email = $scope.email;
            var senha = $scope.senha;
            var confirmarSenha = $scope.confirmacaoSenha;
            
            
        }

    });
