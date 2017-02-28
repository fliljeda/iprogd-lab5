// Dinner controller that we use whenever we have view that needs to 
// display or modify the dinner menu
dinnerPlannerApp.controller('DinnerCtrl', function ($scope,Dinner) {

  $scope.numberOfGuests = Dinner.getNumberOfGuests();

  $scope.setNumberOfGuest = function(number){
    Dinner.setNumberOfGuests(number);
  }

  $scope.getNumberOfGuests = function() {
    return Dinner.getNumberOfGuests();
  }

  // TODO in Lab 5: Implement the methods to get the dinner menu
  // add dish to menu and get total menu price
  
  $scope.getStarterPrice = function() {
      return Dinner.totalDishPrice(Dinner.getStarter());
  }
  $scope.getMainCoursePrice = function() {
      return Dinner.totalDishPrice(Dinner.getMainCourse());
  }
  $scope.getDessertPrice = function() {
      return Dinner.totalDishPrice(Dinner.getDessert());
  }

  $scope.getStarterName = function() {
      return Dinner.dishName(Dinner.getStarter());
  }
  $scope.getMainCourseName = function() {
      return Dinner.dishName(Dinner.getMainCourse());
  }
  $scope.getDessertName = function() {
      return Dinner.dishName(Dinner.getDessert());
  }

  $scope.totalMenuPrice = function(){
      return Dinner.getTotalMenuPrice();
  }

  $scope.pendingMenuPrice = function(){
        return Dinner.getTotalMenuPrice()+Dinner.getCurrentDishPrice();
  }

});
