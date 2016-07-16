(function () {

  var app = angular.module('pokedex', [
    'ngRoute',
    'pokedex.controllers',
    'pokedex.directives',
    'pokedex.services'
  ]);

  app.config(['$routeProvider', function ($routeProvider) {
    $routeProvider
      .when('/', {
				templateUrl : 'views/instructions.html'
			})
      .when('/list/', {
            templateUrl: 'views/pokedex.html',
            controller: 'PokedexController'
        })
  }]);

})();

