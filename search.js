var doctors = require('./data/doctors.json')
var restaurants = require('./data/restaurants.json')
var users = require('./data/users.json')
var tips = require('./data/tips.json')
var _ = require('lodash'); //Prevents lodash errors

module.exports = function(app) {

	app.get('/search', function(req, res) {
		res.render('search')
	})

	app.get('/search/restaurants/name/has/:keyword', function(req, res) {
		var keyword = req.params.keyword

		var rs = _.filter(restaurants, function(item){
			return _.contains(item.name,keyword);
		})

		res.render('listRestaurants.jade', {
			restaurants: rs
		})
	})

	app.get('/search/restaurants/good/for/:x', function(req, res) {
		var x = req.params.x

		var rs = _.filter(restaurants, function(item){
			if(item.attributes['Good For']){
				return item['attributes']['Good For'][x];
			}
		})

		res.render('listRestaurants.jade', {
			restaurants: rs
		})
	})

	app.get('/search/restaurants/ambience/is/:x', function(req, res) {
		var x = req.params.x

		var rs = _.filter(restaurants, function(item){
			if(item.attributes['Ambience']){
				return item['attributes']['Ambience'][x];
			}
		})

		res.render('listRestaurants.jade', {
			restaurants: rs
		})
	})    

	app.get('/search/restaurants/category/is/:x', function(req, res) {
		var x = req.params.x

		if (x == 'Fast-Food')
		{
			x = 'Fast Food'; //It's formatted this way in restaurants.json
		}

		var rs = _.filter(restaurants, function(item){
			if (_.contains(item.categories, x))
			{
				return true;
			}
		})

		res.render('listRestaurants.jade', {
			restaurants: rs
		})
	})    


	app.get('/search/restaurants/stars/:relationship/:number', function(req, res) {
		var number = req.params.number
		var relationship = req.params.relationship
		var rs;

		if(relationship == "above")
		{
			var rs = _.filter(restaurants, function(item){
				if(item.stars >= number)
				{
					return true;
				}
			})
		}
		else if(relationship == "below")
		{
			var rs = _.filter(restaurants, function(item){
				if(item.stars <= number)
				{
					return true;
				}
			})
		}

		res.render('listRestaurants.jade', {
			restaurants: rs
		})
	})

	app.get('/search/restaurants/q', function(req, res) {

		var name = req.query.name
		var minStars = req.query.minStars
		var category = req.query.category
		var ambience = req.query.ambience   
		var rs;

		console.log('req.query: ', req.query)

		//Multiple unrelated if statements b/c we want to support compound queries
		if (name)
		{
			var rs = _.filter(restaurants, function(item){
				if (_.contains(item.name,name))
				{
					return true;
				}
			})
		}

		if (minStars)
		{
			var rs = _.filter(restaurants, function(item){
				if(item.stars >= minStars)
				{
					return true;
				}
			})
		}

		if(category)
		{
			var rs = _.filter(restaurants,function(item){
				if(_.contains(item.categories, category))
				{
					return true;
				} 
			})
		}

		if(ambience)
		{
			var rs = _.filter(restaurants, function(item){
				if(item.attributes['Ambience'])
				{
					return item.attributes.Ambience[ambience];
				}
			})
		}

		res.render('listRestaurants.jade', {
			restaurants: rs
		})
	})    

}