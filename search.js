var express = require('express')
var app = express()

var _ = require('lodash')

var doctors = require('./data/doctors.json')
var restaurants = require('./data/restaurants.json')
var users = require('./data/users.json')
var tips = require('./data/tips.json')

module.exports = function(app) {

    app.get('/search', function(req, res) {
        res.render('search')
    })

    app.get('/search/restaurants/name/has/:keyword', function(req, res) {
        var keyword = req.params.keyword

        var rs =_.filter(restaurants, function(chr) { return chr.name.indexOf(keyword) > -1; });
        res.render('listRestaurants.jade', {
            restaurants: rs
        })
    })
        // TODO: lookup restaurants whose names contain the given keyword
    
	app.get('/search/restaurants/good/for/:x', function(req, res) {
        var x = req.params.x

        // TODO: lookup restaurants good for  :
        var rs = _.filter(restaurants, function(chr){ if (chr.attributes['Good For'] != undefined) {
return chr.attributes['Good For'][x]};});


        res.render('listRestaurants.jade', {
            restaurants: rs
        })
    })

    app.get('/search/restaurants/ambience/is/:x', function(req, res) {
        var x = req.params.x

        // TODO: lookup restaurants has ambience of :x
        var rs = _.filter(restaurants, function(chr){if (chr.attributes.Ambience != undefined){
		return chr.attributes.Ambience[x]};
		});
        res.render('listRestaurants.jade', {
            restaurants: rs
        })
    })    

    app.get('/search/restaurants/category/is/:x', function(req, res) {
        var x = req.params.x

        // TODO: lookup restaurants belonging to category :x
        var rs = _.filter(restaurants, function(chr){for( cat in chr.categories){ console.log(chr.categories[cat])
				if (chr.categories[cat] == x){
				return true} ;}});
		console.log(rs)
        res.render('listRestaurants.jade', {
            restaurants: rs
        })
    })    


    app.get('/search/restaurants/stars/:relationship/:number', function(req, res) {
        var number = req.params.number
        var relationship = req.params.relationship

        // TODO: lookup restaurants with starts higher or lower than :number
        var rs = [restaurants[1], restaurants[2], restaurants[3]] // hardcoded fake results

        res.render('listRestaurants.jade', {
            restaurants: rs
        })
    })

    app.get('/search/restaurants/q', function(req, res) {
                
        var name = req.query.name
        var minStars = req.query.minStars
        var category = req.query.category
        var ambience = req.query.ambience    
        
        console.log('req.query: ', req.query)    
        
        // // TODO: lookup restaurants with the given query parameters
        var rs = [restaurants[1], restaurants[2], restaurants[3]] // hardcoded fake results

        res.render('listRestaurants.jade', {
            restaurants: rs
        })
    })    
}
