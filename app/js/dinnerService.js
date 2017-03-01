// Here we create an Angular service that we will use for our 
// model. In your controllers (or other services) you can include the
// dependency on any service you need. Angular will insure that the
// service is created first time it is needed and then just reuse it
// the next time.
dinnerPlannerApp.factory('Dinner',function ($resource) {

	var numberOfGuests = 2;
    var selectedDishes = []; //dishes on the menu
    var currentDishId;
    var currentDishPrice = 0;
    var APIHeader = {
    	'X-Mashape-Key': 'Qu9grxVNWpmshA4Kl9pTwyiJxVGUp1lKzrZjsnghQMkFkfA4LB'
    };

    this.DishSearch = $resource('https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/search',{},{
    	get: {
    		headers: {
    			'X-Mashape-Key': 'Qu9grxVNWpmshA4Kl9pTwyiJxVGUp1lKzrZjsnghQMkFkfA4LB'
    		}
    	}
    });
    
    this.Dish = $resource('https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/:id/information',{},{
    	get: {
    		headers: {
    			'X-Mashape-Key': 'Qu9grxVNWpmshA4Kl9pTwyiJxVGUp1lKzrZjsnghQMkFkfA4LB'
    		}
    	}
    });

    var dinnerSelf = this;

    this.setDishToShow = function(dishId){
    	currentDishId = dishId;
    }

    this.getDishToShow = function(){
    	return currentDishId;
    }

    this.setCurrentDishPrice = function(price){
        currentDishPrice = price;
    }
    this.getCurrentDishPrice = function(){
        return currentDishPrice;
    }

    this.setNumberOfGuests = function(num) {
    	numberOfGuests = num;
    }

	// should return
	this.getNumberOfGuests = function() {
		return numberOfGuests;
	}

	//Returns the dish that is on the menu for selected type
	this.getSelectedDish = function(type) {
		for(var i = 0; i < selectedDishes.length; i++){
			if(!(typeof(selectedDishes[i]) == 'undefined') && selectedDishes[i].type == type){
				return selectedDishes[i];
			}
		}
	}

	//Returns all the dishes on the menu.
	this.getFullMenu = function() {
		return selectedDishes;
	}

	//Returns all ingredients for all the dishes on the menu.
	this.getAllIngredients = function() {
		var allIngredients = [];
		for(var i = 0; i < selectedDishes.length; i++){
			if (!(typeof(selectedDishes[i].ingredients) == 'undefined')){
				var dishIngredients = selectedDishes[i].ingredients;
				for(var j = 0; j < dishIngredients.length; j++){
					allIngredients.push(dishIngredients[j]);
				}
			}
		}
		return allIngredients;
	}

	//Returns the total price of the menu (all the ingredients multiplied by number of guests).
	this.getTotalMenuPrice = function() {
        var sum = 0;
        for(i in selectedDishes){
            sum += dinnerSelf.totalDishPrice(selectedDishes[i]);
        }
        return sum;
	}

	//Adds the passed dish to the menu. If the dish of that type already exists on the menu
	//it is removed from the menu and the new one added.
	this.addDishToMenu = function(id) {
		var dishToAdd = {};

		dinnerSelf.Dish.get({id : id},function(data){
			dishToAdd = data;
			dishToAdd.type = dinnerSelf.findProperDishType(data.dishTypes);
			dishToAdd.price = dinnerSelf.totalDishPrice(dishToAdd);
            if(typeof(dishToAdd.type) == 'undefined'){
                alert("FoodType is not not allowed in our dinnerplanner, sorry m8");
            }else if(dishToAdd.type == 'starter'){
				selectedDishes[0] = dishToAdd;
			}
			else if(dishToAdd.type == 'main course'){
				selectedDishes[1] = dishToAdd;
			}
			else if(dishToAdd.type == 'dessert'){
				selectedDishes[2] = dishToAdd;
			}
			else{
				alert("Food is not classed as any type recognized");
			}

		},function(data){
		});

	}

	this.removeDishFromMenuByType = function (type) {
		if(type == 'starter'){
			delete selectedDishes[0];
		}
		else if(type == 'main course'){
			delete selectedDishes[1];
		}
		else if(type == 'dessert'){
			delete selectedDishes[2];
		}
		else{
			console.log("Error in removing dish from sidebar: Wrong type - " + type);
		}
	}

    this.getStarter = function(){
        return selectedDishes[0];
    }
    this.getMainCourse = function(){
        return selectedDishes[1];
    }
    this.getDessert = function(){
        return selectedDishes[2];
    }

    this.dishName = function(dish){
        if(typeof(dish) == 'undefined') return "";
        return dish.title;
    }

	this.totalDishPrice = function (dish) {
        if(typeof(dish) == 'undefined') return 0;

        ingredients = dish.extendedIngredients;
		var sum = 0;
		for(var i = 0; i < ingredients.length; i++){
			sum += ingredients[i].amount;
		}
		return sum;
	}



	//function that returns all dishes of specific type (i.e. "starter", "main dish" or "dessert")
	//you can use the filter argument to filter out the dish by name or ingredient (use for search)
	//if you don't pass any filter all the dishes will be returned
	/*this.getAllDishes = function (type,filter, cb, cberr) {

		var numberOfDishesToGet = 10;
		var searchString = filter;
		var dishType = type;

		$.ajax( {
			url: 'https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/search',
			headers: APIHeader,
			data: {
				number : numberOfDishesToGet,
				query : searchString,
				type : dishType
			},
			success: function(data) {
				if(data.results.length == 0) cberr(-3000);

				for (var i = 0; i < data.results.length; i++){
					var dish = {};
					dish.name = data.results[i].title;
					dish.image = data.results[i].image;
					dish.id = data.results[i].id;
					dish.type = dishType;
					dinnerSelf.addRecipeInformation(dish, cb, numberOfDishesToGet);
				}

			},
			error: function(data) {
				cberr(404);
			}
		});
	}*/

	//function that returns a dish of specific ID
	/*this.getDish = function (id,cb) {
		$.ajax({
			url: 'https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/' + id + '/information',
			headers : APIHeader,
			
			success: function(data){
				var dish = {};
				dish.name = data.title;
				dish.image = data.image;
				dish.description = data.instructions;
				dish.id = id;
				dish.type = dinnerSelf.findProperDishType(data.dishTypes);
				dish.ingredients = [];
				for (var j = 0; j < data.extendedIngredients.length; j++){
					dish.ingredients.push({});
					dish.ingredients[j].name = data.extendedIngredients[j].name;
					dish.ingredients[j].quantity = data.extendedIngredients[j].amount;
					dish.ingredients[j].unit = data.extendedIngredients[j].unitShort;
					dish.ingredients[j].price = data.extendedIngredients[j].amount;
				}
				cb(dish);

			}
			
		});
	}*/

	this.findProperDishType = function (obj) {
		for(var i = 0; i < obj.length; i++){
			if(obj[i] == 'starter' || obj[i] == 'main course' || obj[i] == 'dessert'){
				return obj[i];
			}
		}
	} 	

	this.addRecipeInformation = function (dish, cb, numberOfDishesToGet){
		$.ajax({
			url: 'https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/' + dish.id + '/information',
			headers : APIHeader,
			success: function(data){
				dish.description = data.instructions;
				dish.ingredients = [];
				for (var j = 0; j < data.extendedIngredients.length; j++){
					dish.ingredients.push({});
					dish.ingredients[j].name = data.extendedIngredients[j].name;
					dish.ingredients[j].quantity = data.extendedIngredients[j].amount;
					dish.ingredients[j].unit = data.extendedIngredients[j].unitShort;
					dish.ingredients[j].price = data.extendedIngredients[j].amount;
				}
				cb(dish, numberOfDishesToGet);
			}
		});
	}



  // Angular service needs to return an object that has all the
  // methods created in it. You can consider that this is instead
  // of calling var model = new DinnerModel() we did in the previous labs
  // This is because Angular takes care of creating it when needed.
  return this;

});
