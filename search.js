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
        var keyword = req.params.keyword

        var rs = _.filter(restaurants, function(restaurant){
            return _.contains(restaurant.name, keyword)
        })

        res.render('listRestaurants.jade', {
            restaurants: rs
        })
    })

    app.get('/search/restaurants/good/for/:x', function(req, res) {
        var x = req.params.x

        var rs = _.filter(restaurants, function(restaurant){
            if (restaurant['attributes']['Good For']) {
                return restaurant['attributes']['Good For'][x];
            }
        })

        res.render('listRestaurants.jade', {
            restaurants: rs
        })
    })

    app.get('/search/restaurants/ambience/is/:x', function(req, res) {
        var x = req.params.x

        var rs = _.filter(restaurants, function(restaurant){
            if (restaurant['attributes']['Ambience']) {
                return restaurant['attributes']['Ambience'][x];
            }
        })

        res.render('listRestaurants.jade', {
            restaurants: rs
        })
    })    

    app.get('/search/restaurants/category/is/:x', function(req, res) {
        if (req.params.x === 'Fast-Food'){
            var x = 'Fast Food'
        } else {
            var x = req.params.x
        }

        var rs = _.filter(restaurants, function(restaurant){
            if (_.contains(restaurant.categories, x)){
                return true
            }
        })
        
        res.render('listRestaurants.jade', {
            restaurants: rs
        })
    })    


    app.get('/search/restaurants/stars/:relationship/:number', function(req, res) {
        var number = req.params.number
        var relationship = req.params.relationship

        var rs = _.filter(restaurants, function(restaurant){
            if (relationship === 'above') {
                if (restaurant.stars >= number) return true
            } else {
                if (restaurant.stars <= number) return true
            }
        })
        
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