var app = angular.module('diet-app', ['ngRoute']);

app.config(function($routeProvider) {
    $routeProvider
        .when("/", {
            templateUrl : "/templates"
        })
        .when("/patients", {
            templateUrl : "/templates/patients",
            controller: 'PatientsController'
        })
        .when("/categories", {
            templateUrl : "/templates/categories",
            controller: 'CategoriesController'
        })
        .otherwise({
            redirectTo: '/'
        });
});