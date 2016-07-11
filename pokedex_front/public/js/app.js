
(function () {
	var app = angular.module('pokedex', [
		'ngRoute',
		'pokedex.services'
	]);

	app.config(['$routeProvider', function ($routeProvider) {
		$routeProvider
			.when('/', {
				templateUrl : 'views/instructions.html'
			})
	}]);

})();
