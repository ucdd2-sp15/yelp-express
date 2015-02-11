module.exports = function(app) {
    
    app.get('/list/restaurants', function(req, res) {

        // get the business collection
        var business = app.db.get('business')

        // compose a query to look up restaurants whose 'categories' field contains the word 'Restaurants'
        var q = {
            'categories': {
                $in: ['Restaurants']
            }
        }

        // execute the query to find those matched limiting to 20
        business.find(q, {
            limit: 20
        }, function(err, restaurants) {

            res.render('listRestaurants.jade', {
                restaurants: restaurants
            })
        })

    })
}