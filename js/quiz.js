(function(){

	// script goes here

	var app = angular.module('myQuiz',[]);

	// strict contextual escaping
	//for minification process and to prevent the minify script from changing the names
	app.controller('QuizController',['$scope','$http','$sce', function($scope,$http,$sce){

			$scope.score = 0 ;
			$scope.activeQuestion = -1;
			$scope.percentage = 0;

			$http.get('quiz_data.json').then(function(quizData){
					$scope.myQuestions = quizData.data;
					$scope.totalQuestions = $scope.myQuestions.length;
			});



	}]);




})();
