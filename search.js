//Authored by - Tanvi Parikh

var doctors = require('./data/doctors.json')
var restaurants = require('./data/restaurants.json')
var users = require('./data/users.json')
var tips = require('./data/tips.json')
var _ = require('lodash');

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

        var rs = _.filter(restaurants, function(r){
            return _.contains(r.name,keyword);
        })
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

        var rs = _.filter(restaurants, function(r){
            if(r.attributes['Ambience']){
                return r.attributes.Ambience[x];
            }
        })

        res.render('listRestaurants.jade', {
            restaurants: rs
        })
    })

	//Function 4 completed
    app.get('/search/restaurants/category/is/:x', function(req, res) {
        var x = req.params.x
        // Fix misalign of fast-food
        if (x == 'Fast-Food') x = 'Fast Food';
        var rs = _.filter(restaurants, function(r){
            if (_.contains(r.categories, x)) return true;
        })
						})
        res.render('listRestaurants.jade', {
            restaurants: rs
        })
    })

	//Function 5 completed
    app.get('/search/restaurants/stars/:relationship/:number', function(req, res) {
        var number = req.params.number
        var relationship = req.params.relationship

        var rs = _.filter(restaurants, function(r){
            if (relationship == 'above'){
                if(r.stars >= number) return true;
            } else if (relationship == 'below'){
                if(r.stars <= number) return true;
            }
            return false;
        })

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

        var rs = restaurants;

        if (name){
            var rs = _.filter(rs, function(r){
                if (_.contains(r.name,name)) return true;
            })
        }

        if (minStars){
            var rs = _.filter(rs, function(r){
                if(r.stars >= minStars) return true;
            })
        }

        if(category){
            var rs = _.filter(rs, function(r){
                if(_.contains(r.categories, category)) return true;
            })
        }

        if(ambience){
            var rs = _.filter(rs, function(r){
                if(r.attributes['Ambience']){
                    return r.attributes.Ambience[ambience];
                }
            })
        }
>>>>>>> 98e82dfb912bb573a30ad7204da3cd0ecf3cbc31
        res.render('listRestaurants.jade', {
            restaurants: rs
        })
    })

}
