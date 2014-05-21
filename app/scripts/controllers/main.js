'use strict';

var liftingTrackerControllers = angular.module('liftingTrackerControllers', []);


liftingTrackerControllers.controller('MainCtrl', function ($scope) {
	$scope.awesomeThings = [
		'HTML5 Boilerplate',
		'AngularJS',
		'Karma'
	];
});

liftingTrackerControllers.service('sharedProperties', ['$location', function ($location) {
	var selectedDays = [];
	return {
		getDay: function () {
			return selectedDays;
		},
		setDays: function(value) {
			localStorage.setItem('days', JSON.stringify(value));
			selectedDays = value;
			$location.path('/setExcercises');
		},
        addWorkouts: function(val) {
        	var days = this.getDay();

        	for (var i = 0; i < days.length; i++) {
        		if (val.dayName === days[i].dayName){
        			//days[i].workouts = [{ name: val.workouts[0].name}];
        			days[i].workouts = val.workouts;
        			//days[i].workouts.push(val.workouts);
        		}
        	}

        	localStorage.setItem('days', JSON.stringify(days));
        	
        },

        strongLifts: function() {

        	var routine = 
		        [
				{
					dayName: "Monday",
					selected: true,
					workouts: [
								{
									name: "Squat",
									weight: 45,
									sets: 5,
									minReps: 5,
									maxReps: 5
								},
								{
									name: "Bench Press",
									weight: 45,
									sets: 5,
									minReps: 5,
									maxReps: 5
								},
								{
									name: "Barbell Row",
									weight: 65,
									sets: 5,
									minReps: 5,
									maxReps: 5
								}
							]
				},
				{
					dayName: "Tuesday",
					selected: false,
							workouts: [
								{
								}
							]
				},
				{
					dayName: "Wednesday",
					selected: true,
							workouts: [
								{
									name: "Squat",
									weight: 50,
									sets: 5,
									minReps: 5,
									maxReps: 5
								},
								{
									name: "Overhead Press",
									weight: 45,
									sets: 5,
									minReps: 5,
									maxReps: 5
								},
								{
									name: "Deadlift",
									weight: 90,
									sets: 1,
									minReps: 5,
									maxReps: 5
								}
							]
				},
				{
					dayName: "Thursday",
					selected: false,
							workouts: [
								{}
							]
				},
				{
					dayName: "Friday",
					selected: true,
							workouts: [
								{
									name: "Squat",
									weight: 55,
									sets: 5,
									minReps: 5,
									maxReps: 5
								},
								{
									name: "Bench Press",
									weight: 50,
									sets: 5,
									minReps: 5,
									maxReps: 5
								},
								{
									name: "Barbell Row",
									weight: 70,
									sets: 5,
									minReps: 5,
									maxReps: 5
								}
							]
				},
				{
					dayName: "Saturday",
					selected: false,
							workouts: [
								{}
							]
				},
				{
					dayName: "Sunday",
					selected: false,
							workouts: [
								{}
							]
				}
			]

			this.setDays(routine);
        }
    };
}]);

 liftingTrackerControllers.controller('DaySelectionCtrl', ['$scope', '$location', 'sharedProperties', function($scope, $location, sharedProperties) {
 	//$scope.selection = JSON.parse(localStorage.getItem('selection')) || []


 	var lclStrgDaysList= JSON.parse(localStorage.getItem('days')) || [];

 	if (lclStrgDaysList.length) {
 		$scope.days = lclStrgDaysList;
 	}
 	else {
	$scope.days = [
		{
			dayName: "Monday",
			selected: false,
			workouts: [
						{}
					]
		},
		{
			dayName: "Tuesday",
			selected: false,
					workouts: [
						{}
					]
		},
		{
			dayName: "Wednesday",
			selected: false,
					workouts: [
						{}
					]
		},
		{
			dayName: "Thursday",
			selected: false,
					workouts: [
						{}
					]
		},
		{
			dayName: "Friday",
			selected: false,
					workouts: [
						{}
					]
		},
		{
			dayName: "Saturday",
			selected: false,
					workouts: [
						{}
					]
		},
		{
			dayName: "Sunday",
			selected: false,
					workouts: [
						{}
					]
		}
	]

 	}

 	$scope.goToSetExcercises = function() {
 		//if ($scope.selection.length) {
 	 		sharedProperties.setDays($scope.days);
 			
 		//}
 		//else {
 		//	alert("Please select days for working out");
 	//	}
 	}

 	$scope.selection = [];

 	var daysContainerDisplay = document.getElementById("daysContainer");

 	daysContainerDisplay.style.display = "none";

 	$scope.createNew = function() {
 		
 		if (daysContainerDisplay.style.display  === "none") {
 			daysContainerDisplay.style.display  = "block";
 		} else {
 			daysContainerDisplay.style.display  = "none";
 		}

 		
 	};

 	$scope.predefinedRoutine = function() {
 		sharedProperties.strongLifts();
 	};
 }]);

 liftingTrackerControllers.controller('SetExcercisesCtrl', ['$scope', '$location', 'sharedProperties', 'exercises', function($scope, $location, sharedProperties, exercises) {
 	
 	
 	$scope.goBtnVal = "Next Day";

 	var daysSelected = JSON.parse(localStorage.getItem('days')) || [];

 	if (daysSelected.length) {
 		$scope.newExercise = daysSelected;
 	}
 	else {
 		$scope.newExercise = sharedProperties.getDay();
 	}

 	var lclStrgWorkoutLst = JSON.parse(localStorage.getItem('days')) || [];
 	//$scope.newExercise = lclStrgWorkoutLst;

 	if (lclStrgWorkoutLst.length) {
 	//	$scope.newExercise = lclStrgWorkoutLst;
 	}
 	

 	//$scope.newExercise = {name: "safs"};
 	$scope.exercises = exercises;

 	$scope.addExercise = function(v) {
 		sharedProperties.addWorkouts(v);
 	};

 	 $scope.goToWorkoutDisplay = function() {

 	 		//sharedProperties.setProperty($scope.selection);
 			$location.path('/workoutsList');

 	};

 	/* hide current workouts and display following day */
 	$scope.showNextDay = function(dayId) {
 		document.getElementById('day'+dayId).style.display = "none";
 		var nextDayElem = document.getElementById('day'+(dayId+1));
 		if (nextDayElem) {
 			nextDayElem.style.display = "block";
 		}
 		else {
 			this.goToWorkoutDisplay();
 		}
 	};

 	$scope.addNew = function() {
 		this.newExercise.workouts.push({

 		});
 	};

 	$scope.removeExercise = function(id) {
 		this.newExercise.workouts.splice(id, 1);
 	};

 }]);


liftingTrackerControllers.factory('exercises', function() {
	var exercises = [];
	var excerciseService = {}

	excerciseService.addExercise = function(excercise) {
		//`	excercise.day = day.dayName;
		//\excercise.selected = day.selected;
		exercises.push(excercise);
		localStorage.setItem('days', JSON.stringify(exercises));
	};

	excerciseService.viewExercises = function() {
		return exercises;
	};

	return excerciseService;
});

 liftingTrackerControllers.controller('WorkoutDisplayCtrl', ['$scope', '$location', 'sharedProperties', 'exercises', function($scope, $location, sharedProperties, exercises) {
 	var lclStrgWorkoutLst = JSON.parse(localStorage.getItem('days')) || [];

 	if (lclStrgWorkoutLst.length) {
 		$scope.workoutList = JSON.parse(localStorage.getItem('days')) || [];//exercises.viewExercises();
 	}
 	else {
 		$scope.workoutList = exercises.viewExercises();
 	}

 	if (!$scope.workoutList.length) {
 		$location.path('/daySelection');
 	}

    $scope.today = function() {
    	var date = new Date();
    	var dayIndex = date.getDay();

        var days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

        var today = days[dayIndex];

        return today;
    };

    $scope.addFive = function(id) {
    	this.day.workouts[id].weight += 5;
    };

    $scope.removeFive = function(id) {

    	if (this.day.workouts[id].weight - 5 > 0) {
    		this.day.workouts[id].weight -= 5;
    	}
    };

    $scope.edit = function() {
    	$location.path('/daySelection');
    };

 }]);

