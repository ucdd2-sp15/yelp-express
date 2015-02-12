var doctors = require('./data/doctors.json')
var restaurants = require('./data/restaurants.json')
var users = require('./data/users.json')
var tips = require('./data/tips.json')
var _ = require('lodash');

module.exports = function(app) {

    app.get('/search', function(req, res) {
        res.render('search')
    })

    app.get('/search/restaurants/name/has/:keyword', function(req, res) {
        var keyword = req.params.keyword
        
        var result = _.filter(restaurants, function(x) { return _.contains(x.name, keyword); });

        res.render('listRestaurants.jade', {
            restaurants: result
        })
    })

    app.get('/search/restaurants/good/for/:x', function(req, res) {
        var keyword = req.params.x

        var result = _.filter(restaurants, function(x) { 
            
            return (x["attributes"]["Good For"] ? x["attributes"]["Good For"][keyword] : false);
            
        });

        res.render('listRestaurants.jade', {
            restaurants: result
        })
    })

    app.get('/search/restaurants/ambience/is/:x', function(req, res) {
        var keyword = req.params.x;

        var result = _.filter(restaurants, function(x) { 
            
            return (x["attributes"]["Ambience"] ? x["attributes"]["Ambience"][keyword] : false);
            
        });

        res.render('listRestaurants.jade', {
            restaurants: result
        })
    })    

    app.get('/search/restaurants/category/is/:x', function(req, res) {
        var keyword = req.params.x.replace("-", " ");

        var result = _.filter(restaurants, function(x) { return _.contains(x.categories, keyword); } );

        res.render('listRestaurants.jade', {
            restaurants: result
        })
    })    


    app.get('/search/restaurants/stars/:relationship/:number', function(req, res) {
        var number = req.params.number
        var relationship = req.params.relationship
        var predicateFunction;
        
        if(relationship == "above")
            predicateFunction = function(x) { return x.stars >= number };
        else
            predicateFunction = function(x) { return x.stars <= number };

        var result = _.filter(restaurants, predicateFunction);

        res.render('listRestaurants.jade', {
            restaurants: result
        })
    })

    app.get('/search/restaurants/q', function(req, res) {
                
        var name = req.query.name
        var minStars = req.query.minStars
        var category = req.query.category
        var ambience = req.query.ambience
        
        var result = restaurants;
        
        if(name) {
            
            result = _.filter(result, function(x) { return _.contains(x.name, name); });
            
        }
        
        if(minStars) {
            
            result = _.filter(result, function(x) { return x.stars <= minStars; });
            
        }
        
        if(category) {
            
            result = _.filter(result, function(x) { return _.contains(x.categories, category); } );
        }
        
        if(ambience) {
            
            result = _.filter(result, function(x) { 
            
            return (x["attributes"]["Ambience"] ? x["attributes"]["Ambience"][ambience] : false);
            
        });
            
        }
        
        console.log('req.query: ', req.query)    

        res.render('listRestaurants.jade', {
            restaurants: result
        })
    })    

}