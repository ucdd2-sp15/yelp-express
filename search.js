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
        var rs =_.filter(restaurants, function(n) { return _.includes(n.name, keyword)})
        res.render('listRestaurants.jade', {
            restaurants: rs
        })
    })

    app.get('/search/restaurants/good/for/:x', function(req, res) {
        var x = req.params.x
        var rs = _.filter(restaurants, function(n) {
            if ('Good For' in n.attributes) {
                if (n.attributes['Good For'][x]){
                    return n.attributes['Good For'][x]
                }
                else {
                    return false
                }
            }
        })
        res.render('listRestaurants.jade', {
            restaurants: rs
        })
    })

    app.get('/search/restaurants/ambience/is/:x', function(req, res) {
        var x = req.params.x
        var rs = _.filter(restaurants, function(n) {
            if ('Ambience' in n.attributes){
                if(n.attributes['Ambience'][x]){
                    return n.attributes['Ambience'][x]
                }
                else
                    return false
            }
        })

        res.render('listRestaurants.jade', {
            restaurants: rs
        })
    })    

    app.get('/search/restaurants/category/is/:x', function(req, res) {
        var x = req.params.x

        if (x == "Fast-Food") {
            x = 'Fast Food'
        }
        var rs = _.filter(restaurants, function(n) {
            return _.includes(n.categories, x)
        })

        res.render('listRestaurants.jade', {
            restaurants: rs
        })
    })    


    app.get('/search/restaurants/stars/:relationship/:number', function(req, res) {
        var number = req.params.number
        var relationship = req.params.relationship
        var rs = _.filter(restaurants, function(n) {
            if (relationship == 'above') {
                if (n.stars >= number) {
                    return n.stars
                }
                else return false
            }

            else if (relationship == 'below') {
                if (n.stars <= number) {
                    return n.stars
                }
                else return false
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

        if (category == 'Fast+Food') {
            category = 'Fast Food'
        }
        
        console.log('req.query: ', req.query)    
        var rs = restaurants;
            if (name) {
                rs = _.filter(rs, function(n) {
                    return _.includes(n.name, name)
                })
            }

            if (minStars) {
                rs = _.filter(rs, function(n) {
                    return n.stars >= minStars
                })
            }
            
            if (category) {
                rs = _.filter(rs, function(n) {
                    return _.includes(n.categories, category)
                })
            }

            if (ambience) {
                rs = _.filter(rs, function(n) {
                    if (n["attributes"]["Ambience"]) {
                        return n["attributes"]["Ambience"][ambience]
                    }
                    else {
                        return false
                    }
                })
            }

        res.render('listRestaurants.jade', {
            restaurants: rs
        })
    })    
}
