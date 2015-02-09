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


        // TODO: lookup restaurants whose names contain the given keyword
        var rs = _.filter(restaurants, 
            function (key) {return key.name.indexOf(keyword) != -1});

        res.render('listRestaurants.jade', {
            restaurants: rs
        })
    })

    app.get('/search/restaurants/good/for/:x', function(req, res) {
        var x = req.params.x
        console.log(x);

        // TODO: lookup restaurants good for  :x
        var rs = _.filter(restaurants,
            function (key) 
                {   
                    try {return key["attributes"]["Good For"][x] == true}
                    catch (err) {return false}
                });

        res.render('listRestaurants.jade', {
            restaurants: rs
        })
    })

    app.get('/search/restaurants/ambience/is/:x', function(req, res) {
        var x = req.params.x

        // TODO: lookup restaurants has ambience of :x
        var rs = _.filter(restaurants,
                    function (key)
                        {
                            try {return key["attributes"]["Ambience"][x] == true}
                            catch (err) {return false}
                        });

        res.render('listRestaurants.jade', {
            restaurants: rs
        })
    })    

    app.get('/search/restaurants/category/is/:x', function(req, res) {
        var x = req.params.x

        // TODO: lookup restaurants belonging to category :x
        var rs = _.filter(restaurants,
                    function (key)
                        {
                            try {return _.includes(key["categories"], x)}
                            catch (err) {return false}
                        });

        res.render('listRestaurants.jade', {
            restaurants: rs
        })
    })    


    app.get('/search/restaurants/stars/:relationship/:number', function(req, res) {
        var number = req.params.number
        var relationship = req.params.relationship

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


        res.render('listRestaurants.jade', {
            restaurants: rs 
        })
    })

    app.get('/search/restaurants/q', function(req, res) {
                
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
              
        res.render('listRestaurants.jade', {
            restaurants: rs
        })
    })    

}
