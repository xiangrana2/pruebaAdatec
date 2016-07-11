
(function () {
	var app = angular.module('pokedex', [
		'ngRoute',
		'httpPostFix',
		'pokedex.services'
	]);

	app.config(['$routeProvider', function ($routeProvider) {
		$routeProvider
			.when('/', {
				templateUrl : 'views/instructions.html'
			})
	}]);

})();
