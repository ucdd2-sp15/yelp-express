var doctors = require('./data/doctors.json')
var restaurants = require('./data/restaurants.json')
var users = require('./data/users.json')
var tips = require('./data/tips.json')
var _ = require('lodash')

// include lodash
var _ = require('lodash')

module.exports = function(app) {

    app.get('/search', function(req, res) {
        res.render('search')
    })

    app.get('/search/restaurants/name/has/:keyword', function(req, res) {
        var keyword = req.params.keyword

        // TODO: lookup restaurants whose names contain the given keyword
<<<<<<< HEAD
        var rs = _.filter(restaurants, 
            function (key) {return key.name.indexOf(keyword) != -1});
=======
        var rs = _.filter(restaurants, function(rstt) 
            {
                if(rstt.hasOwnProperty("name")) {
                    return (rstt.name.indexOf(keyword) > -1);
                }
            });
>>>>>>> 595c2675e3d2b3b1eb07e7c4c9150a80dc4584ba

        res.render('listRestaurants.jade', {
            restaurants: rs
        })
    })

    app.get('/search/restaurants/good/for/:x', function(req, res) {
        var x = req.params.x
        console.log(x);

        // TODO: lookup restaurants good for  :x
<<<<<<< HEAD
        var rs = _.filter(restaurants,
            function (key) 
                {   
                    try {return key["attributes"]["Good For"][x] == true}
                    catch (err) {return false}
                });
=======
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
>>>>>>> 595c2675e3d2b3b1eb07e7c4c9150a80dc4584ba

        res.render('listRestaurants.jade', {
            restaurants: rs
        })
    })

    app.get('/search/restaurants/ambience/is/:x', function(req, res) {
        var x = req.params.x

        // TODO: lookup restaurants has ambience of :x
<<<<<<< HEAD
        var rs = _.filter(restaurants,
                    function (key)
                        {
                            try {return key["attributes"]["Ambience"][x] == true}
                            catch (err) {return false}
                        });
=======
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
>>>>>>> 595c2675e3d2b3b1eb07e7c4c9150a80dc4584ba

        res.render('listRestaurants.jade', {
            restaurants: rs
        })
    })    

    app.get('/search/restaurants/category/is/:x', function(req, res) {
        var x = req.params.x
        var x2 = x.replace("-", " ");

        // TODO: lookup restaurants belonging to category :x
<<<<<<< HEAD
        var rs = _.filter(restaurants,
                    function (key)
                        {
                            try {return _.includes(key["categories"], x)}
                            catch (err) {return false}
                        });
=======
        var rs = _.filter(restaurants, function(rstt) {
            if(rstt.hasOwnProperty("categories")) {
                var cats = rstt.categories;
                //console.log(cats);
                //console.log(x + " " + x2);
                return ( _.includes(cats, x) || _.includes(cats, x2) );
            }
        });
>>>>>>> 595c2675e3d2b3b1eb07e7c4c9150a80dc4584ba

        res.render('listRestaurants.jade', {
            restaurants: rs
        })
    })    


    app.get('/search/restaurants/stars/:relationship/:number', function(req, res) {
        var number = req.params.number
        var relationship = req.params.relationship
        //console.log(relationship + " " + number);

<<<<<<< HEAD
       // TODO: lookup restaurants with starts higher or lower than :number
       var rs = _.filter(restaurants,
                function (key)
                    {
                        try {
                            if (relationship == "above")
                                return key.stars > number;
                            else
                                return key.stars < number;
                            }
                        catch (err) {return false;}
                    });

=======
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
>>>>>>> 595c2675e3d2b3b1eb07e7c4c9150a80dc4584ba

        res.render('listRestaurants.jade', {
            restaurants: rs 
        })
    })

    app.get('/search/restaurants/q', function(req, res) {
                
<<<<<<< HEAD
        var name = req.query.name
        var minStars = req.query.minStars
        var category = req.query.category
        var ambience = req.query.ambience   
        
        var nQuery = {'name': req["query"]["name"], 
                      'stars': + minStars,
                      'attributes':
                        {'Good For':
                            {req["query"]["category"]: true}
                        },
                       'Ambience':
                            {req["query"]["ambience"]: true}
        }
        console.log('req.query: ', nQuery);    
        var rs = _.filter(restaurants, nQuery);
        
        // TODO: lookup restaurants with the given query parameters
        //var f1 = function (filtered0, pram){
        //    return _.filter(filtered0, function (key, pram) {
        //        console.log(key["name"]);
        //        console.log(pram);
        //        return key["name"] == name});
        //    }
        //var f2 = function (filtered1) {
        //    console.log(filtered1);
        //    if (minStars == undefined) return filtered1;
        //    else
        //    return _.filter(filtered1, function (key) {return key.stars > minStars});
        // }
        // var f3 = function (filtered2) {
        //   console.log(filtered2);
        //   if (category == undefined) return filtered2;
        //   else
        //   return  _.filter(filtered2, function (key)
        //                {
        //                    try {return _.includes(key["categories"], category)}
        //                    catch (err) {return false}
        //               });
        // }
        // var f4 = function (filtered3) {
        //    console.log(filtered3);
        //    if (ambience == undefined) return filtered3;
        //     return _.filter(filtered3,
        //            function (key)
        //                {
        //                    try {return key["attributes"]["Ambience"][ambience] == true}
        //                    catch (err) {return false}
        //                });
        // }
        //var flowfunc = _.flow(f1, name,f2,f3,f4);
              
=======
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

>>>>>>> 595c2675e3d2b3b1eb07e7c4c9150a80dc4584ba
        res.render('listRestaurants.jade', {
            restaurants: rs
        })
    })    

}
