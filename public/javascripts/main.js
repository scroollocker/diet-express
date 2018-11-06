var app = angular.module('diet-app', ['ngRoute']);

app.config(function($routeProvider) {
    $routeProvider
        // .when("/", {
        //     templateUrl : "/templates"
        // })
        .when("/patients", {
            templateUrl : "/templates/patients",
            controller: 'PatientsController'
        })
        .when("/categories", {
            templateUrl : "/templates/categories",
            controller: 'CategoriesController'
        })
        .when("/ingredients", {
            templateUrl : "/templates/ingredients",
            controller: 'IngredientsController'
        })
        .when("/calculator", {
            templateUrl : "/templates/calculator",
            controller: 'CalculatorController'
        })
        .when("/foods/:patientId", {
            templateUrl : "/templates/foods",
            controller: 'HistoryController'
        })
        .when("/activity/calculator", {
            templateUrl: "/templates/activity/calculator",
            controller: 'ActivityCalculatorController'
        })
        .when("/activity", {
            templateUrl: "/templates/activity",
            controller: 'ActivityController'
        })
        .otherwise({
            redirectTo: '/patients'
        });
});