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


        // TODO: lookup restaurants whose names contain the given keyword
        var rs = _.filter(restaurants, function(n){
            return _.contains(n.name,keyword);
        })
        
        res.render('listRestaurants.jade', {
            restaurants: rs
        })
    })

    app.get('/search/restaurants/good/for/:x', function(req, res) {
        var x = req.params.x

        // TODO: lookup restaurants good for  :x
        var rs = _.filter(restaurants, function(n){
            if(n.attributes['Good For']){
                if(n.attributes['Good For'][x])
                    return n;
            }
        })

        res.render('listRestaurants.jade', {
            restaurants: rs
        })
    })

    app.get('/search/restaurants/ambience/is/:x', function(req, res) {
        var x = req.params.x

        // TODO: lookup restaurants has ambience of :x
        var rs = _.filter(restaurants, function(n){
            if(n.attributes['Ambience']){
                if(n.attributes['Ambience'][x])
                    return n;
            }
        })

        res.render('listRestaurants.jade', {
            restaurants: rs
        })
    })    

    app.get('/search/restaurants/category/is/:x', function(req, res) {
        var x = req.params.x

        if (x == "Fast-Food")
            x = "Fast Food"

        // TODO: lookup restaurants belonging to category :x
        var rs = _.filter(restaurants, function(n){
            if (_.contains(n.categories, x)) 
                return n;
        })

        res.render('listRestaurants.jade', {
            restaurants: rs
        })
    })    


    app.get('/search/restaurants/stars/:relationship/:number', function(req, res) {
        var number = req.params.number
        var relationship = req.params.relationship

        // TODO: lookup restaurants with starts higher or lower than :number
        var rs = _.filter(restaurants, function(n){
            if ((relationship == "above" && n.stars >= number) || (relationship == "below" && n.stars <= number)) 
                return n;
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
        if (name){
            var rsn = _.filter(restaurants, function(n){
                if(_.contains(n.name,name))
                    return n;
            })
        }

        if (minStars){
            var rss = _.filter(restaurants, function(n){
                if(minStars <= n.stars)
                    return n;
            })
        }

        if (category){
            var rsc = _.filter(restaurants, function(n){
                if(_.contains(n.categories, category))
                        return n;
            })
        }

        if (ambience){
            var rsa = _.filter(restaurants, function(n){ 
                if(n.attributes['Ambience'])
                    if(n.attributes['Ambience'][ambience])
                        return n;
            })
        }

        var rs = _.intersection(rsn,rss,rsc,rsa)

        res.render('listRestaurants.jade', {
            restaurants: rs
        })
    })    

}