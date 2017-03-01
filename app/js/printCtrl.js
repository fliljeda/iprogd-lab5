dinnerPlannerApp.controller('PrintCtrl', function ($scope,$routeParams,Dinner) {

	$scope.guests = Dinner.getNumberOfGuests();
	$scope.menu = Dinner.getFullMenu();
	$scope.dishPriceStarter = 0;
	$scope.dishPriceMain = 0;
	$scope.dishPriceDessert = 0;
	$scope.showStarter = false;
	$scope.showMain = false;
	$scope.showDessert = false;

	if(!(typeof($scope.menu[0]) == 'undefined')){
		$scope.dishPriceStarter = $scope.menu[0].price;
		$scope.showStarter = true;
		
	}if(!(typeof($scope.menu[1]) == 'undefined')){
		$scope.dishPriceMain = $scope.menu[1].price;
		$scope.showMain = true;

	}if(!(typeof($scope.menu[2]) == 'undefined')){
		$scope.dishPriceDessert = $scope.menu[2].price;
		$scope.showDessert = true;
	}


});