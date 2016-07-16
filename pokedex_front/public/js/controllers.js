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
    .controller('TabsController', function () {
      this.tab = 1;

      this.selectTab = function (tab) {
        this.tab = tab;
      };
    });
})();
