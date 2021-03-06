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

			$scope.selectAnswer = function(qIndex,aIndex){
				// console.log(qIndex +  ' and ' + aIndex );

				var questionState = $scope.myQuestions[qIndex].questionState;

				if( questionState != 'answered'){
					$scope.myQuestions[qIndex].selectedAnswer = aIndex;
					var correctAnswer = $scope.myQuestions[qIndex].correct;
					$scope.myQuestions[qIndex].correctAnswer =correctAnswer;

					if( aIndex === correctAnswer ){
						$scope.myQuestions[qIndex].correctness = 'correct';
						$scope.score += 1;
					} else {
						$scope.myQuestions[qIndex].correctness = 'incorrect';
					}
						$scope.myQuestions[qIndex].questionState = 'answered';
				}
				/* Percentage Meter */
				$scope.percentage = ($scope.score / $scope.totalQuestions)  * 100 ;

				$scope.isSelected = function(qIndex,aIndex){
					return  $scope.myQuestions[qIndex].selectedAnswer === aIndex;
				}
				$scope.isCorrect = function(qIndex,aIndex){
					return  $scope.myQuestions[qIndex].correctAnswer === aIndex;
				}
			}
			$scope.selectContinue = function(){
				return $scope.activeQuestion += 1;
			}
			$scope.createShareLinks = function(percentage){
				var url = 'http://kayode.me';

				var emailLink = '<a class="btn email" href="mailto:?subject=Try to beat my quiz score!&amp;body=I scored ' + percentage + '%25 on this quiz about Saturn. Try to beat my score at ' + url + '">Email a Friend</a>';
var twitterLink = '<a class="btn twitter" target="_blank" href="http://twitter.com/share?text=I scored a ' + percentage + '%25 on this quiz about Saturn. Try to beat my score at&amp;hashtags=SaturnQuiz&amp;url=' + url + '">Tweet Your Score</a>';
				var newMarkup = emailLink + twitterLink ;

				return $sce.trustAsHtml(newMarkup);

		}
	}]);




})();
