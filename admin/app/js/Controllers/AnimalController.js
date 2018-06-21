  (function() {
      'use strict';
      angular.module('miaudote.controller')

          .controller('AnimalController', function CadAnimalController($scope) {
              $scope.CadastrarAnimal = function() {
                  $.ajax({
                      type: "POST",
                      url: "../api/Animal.php?acao=CadastrarAnimal",
                      data: $scope.animal,
                      success: function(e) {
                          if (e.sucesso) {
                              $("#mensagem").html("<div class=\"col-md-12\" style=\"border:1px solid #b3e096; background-color:#a2db7f; border-radius:4px;\">" + e.mensagem + "</div>");
                              document.getElementById("Salvar").innerHTML = "Cadastrados com sucesso!";
                              window.location = "/#!/Animal";
                          }
                          else {
                              $("#mensagem").html("<div class=\"col-md-12\" style=\"border:1px solid #efa39b; background-color:#f7ded7; border-radius:4px;\">" + e.mensagem + "</div>");
                          }
                      }
                  });
              }
          });

  })();