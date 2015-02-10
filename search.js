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

        // lookup restaurants whose names contain the given keyword
        var rs = _.filter(restaurants, function(myRestaurant){
          return _.contains(myRestaurant.name, keyword);
        });

        res.render('listRestaurants.jade', {
            restaurants: rs
        })
    })

    app.get('/search/restaurants/good/for/:x', function(req, res) {
        var x = req.params.x
        console.log(req)

        // TODO: lookup restaurants good for  :x
        var rs = _.filter(restaurants, function(myRestaurant){
          if (myRestaurant['attributes']['Good For']){
            return myRestaurant['attributes']['Good For'][x]
          }
        });

        res.render('listRestaurants.jade', {
            restaurants: rs
        })
    })

    app.get('/search/restaurants/ambience/is/:x', function(req, res) {
        var x = req.params.x

        // TODO: lookup restaurants has ambience of :x
        var rs = _.filter(restaurants, function(myRestaurant){
          if (myRestaurant['attributes']['Ambience']){
            return myRestaurant['attributes']['Ambience'][x]
          }
        });


        res.render('listRestaurants.jade', {
            restaurants: rs
        })
    })

    app.get('/search/restaurants/category/is/:x', function(req, res) {
        var x = req.params.x

        // TODO: lookup restaurants belonging to category :x
        var rs = _.filter(restaurants, function(myRestaurant){
          return _.contains(myRestaurant.categories, x);
        });


        res.render('listRestaurants.jade', {
            restaurants: rs
        })
    })


    app.get('/search/restaurants/stars/:relationship/:number', function(req, res) {
        var number = req.params.number
        var relationship = req.params.relationship

        // TODO: lookup restaurants with starts higher or lower than :number
        var rs = _.filter(restaurants, function(myRestaurant){
          if (relationship == "below"){
            return myRestaurant.stars <= number;
          }
          else{
            return myRestaurant.stars >= number;
          }

        });

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

        if (name){
          rs = _.filter(rs, function(myRestaurant){
            return _.contains(myRestaurant.name, name)
          })
        }
        if (minStars){
          rs = _.filter(rs, function(myRestaurant){
            return myRestaurant.stars >= minStars;
          });
        }
        if (category){
          rs = _.filter(rs, function(myRestaurant){
            return _.contains(myRestaurant.category, category);
          });
        }
        if (ambience){
          rs = _.filter(rs, function(myRestaurant){
            if (myRestaurant['attributes']['Ambience']){
              return myRestaurant['attributes']['Ambience'][ambience]
            }
          });
        }
        res.render('listRestaurants.jade', {
            restaurants: rs
        })
    })

}
