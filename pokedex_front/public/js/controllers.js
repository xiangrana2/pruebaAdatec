(function () {

  angular.module('pokedex.controllers', [])
    .controller('PokedexController', ['$scope', '$routeParams', 'pokemonService', function ($scope, $routeParams, pokemonService) {
      var type = $routeParams.type;
        pokemonService.all().then(function (data) {
          $scope.pokemons = data;
          $scope.groupped = partition(data, 4);
        });


      function partition(data, n) {
        return _.chain(data).groupBy(function (element, index) {
          return Math.floor(index / n);
        }).toArray().value();
      }

    }])
    .controller('postController', function($scope, $http) {
        // create a blank object to handle form data.
        $scope.formData = {};
        // calling our submit function.
        $scope.submitForm = function() {

        // clean message text.
        $('#messages').empty();

        $http({
          method  : 'POST',
          url     : 'http://localhost:8000/pokemons/',
          data    : $.param($scope.formData),
          headers : {'Content-Type': 'application/x-www-form-urlencoded'} 
         })
          .success(function(data) {
            $('#messages').append('<p>' + "Pokemon successfuly created." +  '</p>');
            $scope.formData = {};
          })
          .error(function(data, status) {
            $('#messages').append('<p>' + "Pokemon couldn't be created. Please check values." +  '</p>');
          });
        };
    })
    .controller('TabsController', function () {
      this.tab = 1;

      this.selectTab = function (tab) {
        this.tab = tab;
      };
    });
})();
