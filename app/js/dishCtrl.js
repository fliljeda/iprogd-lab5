// Dinner controller that we use whenever we want to display detailed
// information for one dish
dinnerPlannerApp.controller('DishCtrl', function ($scope,$routeParams,Dinner) {

	
	$scope.dishId = $routeParams.dishId;
	$scope.guests = Dinner.getNumberOfGuests;
	$scope.totalPrice = 0;

	$scope.status = "Searching...";
	Dinner.Dish.get({id : $scope.dishId},function(data){
		$scope.dish = data;

		for(var i = 0; i < $scope.dish.extendedIngredients.length; i++){
			$scope.totalPrice += $scope.dish.extendedIngredients[i].amount;
		}

	},function(data){
		$scope.status = "There was an error";
	});


});
