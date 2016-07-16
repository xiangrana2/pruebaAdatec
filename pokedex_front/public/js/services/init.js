(function () {

  angular.module('pokedex.services', [])

    .factory('pokemonService', ['$http', '$q', '$filter', '$window', function ($http, $q, $filter, $window) {
      function all() {
          var deferred = $q.defer();

          $http.get('http://localhost:8000/pokemons/?format=json')
            .success(function (data) {
              deferred.resolve(data);
            });

          return deferred.promise;
    }

      return {
        all: all
      };

    }]).constant('config', {
      BACKURL       : 'http://localhost:8000'
    });

})();
