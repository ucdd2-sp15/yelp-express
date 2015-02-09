//Authored by - Tanvi Parikh

var doctors = require('./data/doctors.json')
var restaurants = require('./data/restaurants.json')
var users = require('./data/users.json')
var tips = require('./data/tips.json')

var _ = require('lodash')

// underscore.js functions used in coding this Assignment-
//
// >> ._filter():
// Looks through each value in the list, returning an array of all the values that pass a truth test (predicate).
// Eg: var evens = _.filter([1, 2, 3, 4, 5, 6], function(num){ return num % 2 == 0; });
// => [2, 4, 6]
//
// >> ._contains():
// Returns true if the value is present in the list. Uses indexOf internally, if list is an Array.
// _.contains([1, 2, 3], 3);
// => true
//
// 

module.exports = function(app) {

    app.get('/search', function(req, res) {
        res.render('search')
    })

    app.get('/search/restaurants/name/has/:keyword', function(req, res) {
        var keyword = req.params.keyword

	//Function 1 Completed
        // TODO: lookup restaurants whose names contain the given keyword
        //var rs = [restaurants[6], restaurants[10]] // hardcoded for 'Pizza'
	console.log(keyword)
	var rs = _.filter(restaurants, function(obj){
		return _.contains(obj.name, keyword) })
	
        res.render('listRestaurants.jade', {
            restaurants: rs
        })
    })

	//Function 2 completed
    app.get('/search/restaurants/good/for/:x', function(req, res) {
        var x = req.params.x

        var rs = _.filter(restaurants, function(r){
            if(r.attributes['Good For']){
                return r['attributes']['Good For'][x];
            }
        })

        res.render('listRestaurants.jade', {
            restaurants: rs
        })
    })

	//Function 3 completed
    app.get('/search/restaurants/ambience/is/:x', function(req, res) {
        var x = req.params.x

        // TODO: lookup restaurants has ambience of :x
        //var rs = [restaurants[1], restaurants[2], restaurants[3]] // hardcoded fake results
	var rs = _.filter(restaurants, function(r){
		if( r['attributes']['Ambience'] ){
			return r['attributes']['Ambience'][x];
						}
						})
        res.render('listRestaurants.jade', {
            restaurants: rs
        })
    })    

	//Function 4 completed
    app.get('/search/restaurants/category/is/:x', function(req, res) {
        var x = req.params.x

        // TODO: lookup restaurants belonging to category :x
        //var rs = [restaurants[1], restaurants[2], restaurants[3]] // hardcoded fake results
	console.log(x)
	if (x == "Fast-Food") 
	{
		x = 'Fast Food'
	}
	var rs = _.filter(restaurants, function(obj){
		if(_.contains(obj.categories, x)){
		return true }

						})
        res.render('listRestaurants.jade', {
            restaurants: rs
        })
    })    

	//Function 5 completed
    app.get('/search/restaurants/stars/:relationship/:number', function(req, res) {
        var number = req.params.number
        var relationship = req.params.relationship
	console.log(number)
	console.log(relationship)
        // TODO: lookup restaurants with starts higher or lower than :number
        //var rs = [restaurants[1], restaurants[2], restaurants[3]] // hardcoded fake results
	if(relationship == "above")
	{
		var rs = _.filter(restaurants, function(y){
			console.log(y['stars'])
			if(y['stars'] >= number)
			{
				return true
			}			})
	}
	else if(relationship == "below")
	{
		var rs = _.filter(restaurants, function(y){
			console.log(y['stars'])
			if(y['stars'] <= number)
			{
				return true
			}			})
	}
        res.render('listRestaurants.jade', {
            restaurants: rs
        })
    })

	//Function 6 completed
    app.get('/search/restaurants/q', function(req, res) {
                
        var name = req.query.name
        var minStars = req.query.minStars
        var category = req.query.category
        var ambience = req.query.ambience    
        
        console.log('req.query: ', req.query)    
        
        // // TODO: lookup restaurants with the given query parameters
        //var rs = [restaurants[1], restaurants[2], restaurants[3]] // hardcoded fake results
		
	//check for name
	if(name)
	{
		var rs = _.filter(restaurants, function(obj){
				return _.contains(obj.name, name) })
	}

	//check for minimum stars
	if(minStars)
	{
		var rs = _.filter(restaurants, function(obj){
				if(obj['stars'] >= minStars)
				{
					return true
				} })
	}

	//check for category
	if(category)
	{
		var rs = _.filter(restaurants, function(obj){
				if(_.contains(obj.categories, category))
				{
					return true 
				} })
	}

	//check for ambience
	if(ambience)
	{
		var rs = _.filter(restaurants, function(obj){
				if(obj['attributes']['Ambience'][ambience])
				{
					return true
				}
			})
	}	

	//check for both minStars and name	
	if( minStars && name)
	{
		var rs = _.filter(restaurants, function(obj){
				if(_.contains(obj.name, name))
				{
					//check for stars
					if(obj['stars'] >= minStars)
					{
						return true
					}

				} })

	}

	//check for both minStars and category
	if( minStars && category)
	{
		if (category == "Fast-Food") 
		{
			category = 'Fast Food'
		}
		var rs = _.filter(restaurants, function(obj){
				if(_.contains(obj.categories, category))
				{
					//check for stars
					if(obj['stars'] >= minStars)
					{
						return true
					}
				} })	
		
	}

	//check for both minStars, name and category
	if( minStars && category && name)
	{
		if (category == "Fast-Food") 
		{
			category = 'Fast Food'
		}
		console.log(minStars)
		console.log(category)
		console.log(name)
		var rs = _.filter(restaurants, function(obj){
				if(_.contains(obj.categories, category))
				{
					//check for stars
					
					if(obj['stars'] >= minStars)
					{
						//check for name
						if(_.contains(obj.name, name))
						{
							return true
						}
					}
				} })	
		
	}

	//check for minStars, name and ambience	
	if(minStars && name && ambience)
	{
		console.log(minStars)
		console.log(ambience)
		console.log(name)
		var rs = _.filter(restaurants, function(obj){
				if(obj['attributes']['Ambience'][ambience])
				{
					//check for stars
					if(obj['stars'] >= minStars)
					{
						//check for name
						if(_.contains(obj.name, name))
						{
							return true
						}
					}
				} })	
	}

	//check for minStars and ambience
	if(minStars && ambience)
	{
		console.log(minStars)
		console.log(ambience)
		var rs = _.filter(restaurants, function(obj){
				if( obj['attributes']['Ambience'] )
				{
					if(obj['attributes']['Ambience'][ambience] )
					{
						//check for stars
						if(obj['stars'] >= minStars)
						{
							return true
						}
					}
				} })
	}
        res.render('listRestaurants.jade', {
            restaurants: rs
        })
    })    

}
