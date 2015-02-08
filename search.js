var doctors = require('./data/doctors.json')
var restaurants = require('./data/restaurants.json')
var users = require('./data/users.json')
var tips = require('./data/tips.json')

// include lodash
var _ = require('lodash')

module.exports = function(app) {

    app.get('/search', function(req, res) {
        res.render('search')
    })

    app.get('/search/restaurants/name/has/:keyword', function(req, res) {
        var keyword = req.params.keyword

        // TODO: lookup restaurants whose names contain the given keyword
        var rs = _.filter(restaurants, function(rstt) 
            {
                if(rstt.hasOwnProperty("name")) {
                    return (rstt.name.indexOf(keyword) > -1);
                }
            });

        res.render('listRestaurants.jade', {
            restaurants: rs
        })
    })

    app.get('/search/restaurants/good/for/:x', function(req, res) {
        var x = req.params.x

        // TODO: lookup restaurants good for  :x
        var rs = _.filter(restaurants, function(rstt) 
            {
                if(rstt.hasOwnProperty("attributes")) {
                    var attrs = rstt.attributes;
                    if(attrs.hasOwnProperty("Good For")) {
                        var goodFor = attrs["Good For"];
                        if(goodFor.hasOwnProperty(x)) {
                            return goodFor[x];
                        }
                    }
                }
            });

        res.render('listRestaurants.jade', {
            restaurants: rs
        })
    })

    app.get('/search/restaurants/ambience/is/:x', function(req, res) {
        var x = req.params.x

        // TODO: lookup restaurants has ambience of :x
        var rs = _.filter(restaurants, function(rstt) {
            if(rstt.hasOwnProperty("attributes")) {
                var attrs = rstt.attributes;
                if(attrs.hasOwnProperty("Ambience")) {
                    var amb = attrs.Ambience;
                    if(amb.hasOwnProperty(x)) {
                        return amb[x];
                    }
                }
            }
        });

        res.render('listRestaurants.jade', {
            restaurants: rs
        })
    })    

    app.get('/search/restaurants/category/is/:x', function(req, res) {
        var x = req.params.x
        var x2 = x.replace("-", " ");

        // TODO: lookup restaurants belonging to category :x
        var rs = _.filter(restaurants, function(rstt) {
            if(rstt.hasOwnProperty("categories")) {
                var cats = rstt.categories;
                //console.log(cats);
                //console.log(x + " " + x2);
                return ( _.includes(cats, x) || _.includes(cats, x2) );
            }
        });

        res.render('listRestaurants.jade', {
            restaurants: rs
        })
    })    


    app.get('/search/restaurants/stars/:relationship/:number', function(req, res) {
        var number = req.params.number
        var relationship = req.params.relationship
        //console.log(relationship + " " + number);

        // TODO: lookup restaurants with starts higher or lower than :number
        var rs = _.filter(restaurants, function(rstt) {
            if(rstt.hasOwnProperty("stars")) {
                if(relationship == "above") {
                    return rstt.stars >= number;
                } else if(relationship == "below") {
                    return rstt.stars <= number;
                }
            }
        });
        //var rs = [restaurants[1], restaurants[2], restaurants[3]] // hardcoded fake results

        res.render('listRestaurants.jade', {
            restaurants: rs
        })
    })

    app.get('/search/restaurants/q', function(req, res) {
                
        var name = req.query.name;
        var minStars = req.query.minStars;
        var category = req.query.category;
        var ambience = req.query.ambience;
        
        console.log('req.query: ', req.query);
        
        // // TODO: lookup restaurants with the given query parameters
        var searches = [];
        
        if(name) { 
            var rs1 = _.filter(restaurants, function(rstt) {
                if(rstt.hasOwnProperty("name")) {
                    return (rstt.name.indexOf(name) > -1);
                }
            });
            searches.push(rs1);
        }
        if(minStars) {
            var rs2 = _.filter(restaurants, function(rstt) {
                if(rstt.hasOwnProperty("stars")) {
                    return rstt.stars >= minStars;
                }
            });
            searches.push(rs2);
        }
        if(category) {
            var category2 = category.replace("-", " ");
            var rs3 = _.filter(restaurants, function(rstt) {
                if(rstt.hasOwnProperty("categories")) {
                    var cats = rstt.categories;
                    return ( _.includes(cats, category) || _.includes(cats, category2) );
                }
            });
            searches.push(rs3);
        }
        if(ambience) {
            var rs4 = _.filter(restaurants, function(rstt) {
                if(rstt.hasOwnProperty("attributes")) {
                    var attrs = rstt.attributes;
                    if(attrs.hasOwnProperty("Ambience")) {
                        var amb = attrs.Ambience;
                        if(amb.hasOwnProperty(ambience)) {
                            return amb[ambience];
                        }
                    }
                }
            });
            searches.push(rs4);
        }
        
        var rs;
        var len = searches.length;
        if(len > 1) {
            rs = _.intersection(searches[0], searches[1]);
            for(var i = 2; i < len; i++) {
                rs = _.intersection(rs, searches[i]);
            }
        } else if(len === 1) {
            rs = searches[0];
        } else {
            rs = [];
        }
        //var rs = [restaurants[1], restaurants[2], restaurants[3]] // hardcoded fake results

        res.render('listRestaurants.jade', {
            restaurants: rs
        })
    })    

}
