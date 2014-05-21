'use strict';

var myApp = angular.module('liftingTrackerApp', [// same as in index.html file
  'ngRoute',
  'liftingTrackerControllers'
]);


myApp.config(function ($routeProvider) {
    $routeProvider
      .when('/daySelection', {
        templateUrl: 'views/daySelection.html',
        controller: 'DaySelectionCtrl'
      })
      .when('/setExcercises', {
        templateUrl: 'views/setExcercises.html',
        controller: 'SetExcercisesCtrl'
      })
      .when('/workoutsList', {
        templateUrl: 'views/workouts.html',
        controller: 'WorkoutDisplayCtrl'
      })
      .otherwise({
        redirectTo: '/workoutsList'
      });
  });
