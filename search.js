var _ = require('lodash')

var doctors = require('./data/doctors.json')
var restaurants = require('./data/restaurants.json')
var users = require('./data/users.json')
var tips = require('./data/tips.json')

var _ = require('lodash')

module.exports = function(app) {

	app.get('/search', function(req, res) {
		res.render('search')
	})


	app.get('/search/restaurants/name/has/:keyword', function(req, res) {
		var keyword = req.params.keyword;
		var restaurant = _.filter(restaurants, function(findrest)
			{
				if (findrest.hasOwnProperty("name")) {
					return (findrest.name.indexOf(keyword) > -1);
				}
			}
		);
		// TODO: lookup restaurants whose names contain the given keyword
		// var rs = [restaurants[6], restaurants[10]] // hardcoded for 'Pizza'

		res.render('listRestaurants.jade', {
			restaurants: restaurant
		})
	})


	app.get('/search/restaurants/good/for/:x', function(req, res) {
		var x = req.params.x;
		var restaurant = _.filter(restaurants, function(findrest)
			{
				if (findrest.hasOwnProperty("attributes")) {
					var att = findrest["attributes"];
					if (att.hasOwnProperty("Good For")) {
						var good = att["Good For"];
						if (good.hasOwnProperty(x)) {
							return good[x];
						}
					}
				}
			}
		);
		// TODO: lookup restaurants good for  :x
		//var rs = [restaurants[1], restaurants[2], restaurants[3]] // hardcoded fake results

		res.render('listRestaurants.jade', {
			restaurants: restaurant
		})
	})


	app.get('/search/restaurants/ambience/is/:x', function(req, res) {
		var x = req.params.x;
		var restaurant = _.filter(restaurants, function(findrest)
			{
				if (findrest.hasOwnProperty("attributes")) {
					if (findrest.attributes.hasOwnProperty("Ambience")) {
						if (findrest.attributes.Ambience.hasOwnProperty(x)) {
							return findrest.attributes.Ambience[x];
						}
					}
				}
			}
		);
		// TODO: lookup restaurants has ambience of :x
		// var rs = [restaurants[1], restaurants[2], restaurants[3]] // hardcoded fake results

		res.render('listRestaurants.jade', {
			restaurants: restaurant
		})
	})    


	app.get('/search/restaurants/category/is/:x', function(req, res) {
		var x = req.params.x;
		var restaurant = _.filter(restaurants, function(findrest)
			{
				if (findrest.hasOwnProperty("categories")) {
					return (_.includes(findrest.categories, x));
				}
			}
		);
		// TODO: lookup restaurants belonging to category :x
		// var rs = [restaurants[1], restaurants[2], restaurants[3]] // hardcoded fake results

		res.render('listRestaurants.jade', {
			restaurants: restaurant
		})
	})    


	app.get('/search/restaurants/stars/:relationship/:number', function(req, res) {
		var number = req.params.number
		var relationship = req.params.relationship
		var restaurant = _.filter(restaurants, function(findrest)
			{
				if (findrest.hasOwnProperty("stars")) {
					if (relationship === "below") {
						return findrest.stars <= number;
					} else
					if (relationship === "above") {
						return findrest.stars > number;
					}
				}
			}
		);
		// TODO: lookup restaurants with stars higher or lower than :number
		// var rs = [restaurants[1], restaurants[2], restaurants[3]] // hardcoded fake results

		res.render('listRestaurants.jade', {
			restaurants: restaurant
		})
	})


	app.get('/search/restaurants/q', function(req, res) {
				
		var name = req.query.name
		var minStars = req.query.minStars
		var category = req.query.category
		var ambience = req.query.ambience    
		
		console.log('req.query: ', req.query)

		// var restaurant = restaurants;

		if (name) {
			var restaurant = _.filter(restaurants, function(findrest) {
				return _.contains(findrest.name, name);
			}
			);
		}

		if (minStars) {
			var restaurant = _.filter(restaurants, function(findrest) {
				return findrest.stars > minStars;
			}
			);
		}

		if (category) {
			var restaurant = _.filter(restaurants, function(findrest) {
				return _.contains(findrest.category, category);
			}
			);
		}

		if (ambience) {
			var restaurant = _.filter(restaurants, function(findrest) {
				if (findrest.hasOwnProperty("attributes")) {
					if (findrest.attributes.hasOwnProperty("Ambience")) {
						return findrest.attributes.Ambience[ambience]
					}
				}
			}
			);
		}    
		// TODO: lookup restaurants with the given query parameters
		// var rs = [restaurants[1], restaurants[2], restaurants[3]] // hardcoded fake results

		res.render('listRestaurants.jade', {
			restaurants: restaurant
		})
	})    

}