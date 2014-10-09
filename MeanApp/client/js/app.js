meanApp = angular.module('meanApp', ['ngRoute'])
  .config(function ($routeProvider) {
      $routeProvider
        .when('/', {
            templateUrl: '/views/todo.html',
            controller: 'TodoCtrl'
        }).otherwise({
            redirectTo: '/'
        });
  });