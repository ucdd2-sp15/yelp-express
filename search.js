var doctors = require('./data/doctors.json')
var restaurants = require('./data/restaurants.json')
var users = require('./data/users.json')
var tips = require('./data/tips.json')

var _ = require('lodash')

module.exports = function(app) {

    var getRestaurantsWithName = function (restaurants, name) {
        return _.filter(restaurants, function(restaurant) {
            return (restaurant.name.indexOf(name) > -1);
        });
    };

    var getRestaurantsGoodFor = function (restaurants, x) {
        return _.filter(restaurants, function (restaurant) {
            if (restaurant.attributes.hasOwnProperty("Good For")) {
                return restaurant.attributes["Good For"][x];
            } else {
                return false;
            }
        });
    };

    var getRestaurantsWithAmbience = function (restaurants, x) {
        return _.filter(restaurants, function (restaurant) {
            if (restaurant.attributes.hasOwnProperty("Ambience")) {
                return restaurant.attributes["Ambience"][x];
            } else {
                return false;
            }
        });
    };

    var getRestaurantsWithCategories = function (restaurants, x) {
        return _.filter(restaurants, function (restaurant) {
            if (restaurant.hasOwnProperty("categories")) {
                return restaurant["categories"].indexOf(x.replace("-", " ")) > -1;
            } else {
                return false;
            }
        });
    };

    var getRestaurantsWithRelationshipToNumber = function (restaurants, relationship, number) {
        return _.filter(restaurants, function (restaurant) {
            if (restaurant.hasOwnProperty("stars")) {
                if (relationship == "above") {
                    return restaurant.stars >= number;
                } else if (relationship == "below") {
                    return restaurant.stars <= number;
                } else {
                    return false;
                }
            } else {
                return false;
            }
        });
    };

    var getRestaurantsWithMinStars = function (restaurants, minStars) {
        return _.filter(restaurants, function (restaurant) {
                return (restaurant.stars >= minStars);
            });
    }

    app.get('/search', function(req, res) {
        res.render('search')
    })

    app.get('/search/restaurants/name/has/:keyword', function(req, res) {
        var keyword = req.params.keyword

        var rs = getRestaurantsWithName(restaurants, keyword);

        res.render('listRestaurants.jade', {
            restaurants: rs
        })
    })

    app.get('/search/restaurants/good/for/:x', function(req, res) {
        var x = req.params.x

        var rs = getRestaurantsGoodFor(restaurants, x);

        res.render('listRestaurants.jade', {
            restaurants: rs
        })
    })

    app.get('/search/restaurants/ambience/is/:x', function(req, res) {
        var x = req.params.x

        var rs = getRestaurantsWithAmbience(restaurants, x);

        res.render('listRestaurants.jade', {
            restaurants: rs
        })
    })    

    app.get('/search/restaurants/category/is/:x', function(req, res) {
        var x = req.params.x

        var rs = getRestaurantsWithCategories(restaurants, x);

        res.render('listRestaurants.jade', {
            restaurants: rs
        })
    })    

    app.get('/search/restaurants/stars/:relationship/:number', function(req, res) {
        var number = req.params.number
        var relationship = req.params.relationship

        var rs = getRestaurantsWithRelationshipToNumber(restaurants, relationship, number);

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

        var rs = restaurants;
        if (name) {
            rs = getRestaurantsWithName(rs, name);
        }
        if (minStars) {
            rs = getRestaurantsWithMinStars(rs, minStars);
        }
        if (category) {
            rs = getRestaurantsWithCategories(rs, category);
        }
        if (ambience) {
            rs = getRestaurantsWithAmbience(rs, ambience);
        }

        res.render('listRestaurants.jade', {
            restaurants: rs
        })
    })    

}