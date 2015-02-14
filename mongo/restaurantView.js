module.exports = function(app) {

    app.get('/view/restaurant/:business_id', function(req, res) {
        //console.log(req)
        // get the business collection
        var business = app.db.get('business')

         var q = {
            'business_id': req.params.business_id            
        }

        var restaurant = business.findOne(q, function(err, item) {

            res.render('viewRestaurant.jade', {
                restaurant: item
            })
        })

    })
}
