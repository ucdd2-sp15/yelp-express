module.exports = function(app) {

	app.get('/list/users', function(req, res) {

        // get the user collection
        var user = app.db.get('user')

        // compose a query to look up docs whose 'categories' field contains the word 'Doctors'
        // var q = {
        //     'categories': {
        //         $in: ['Restaurants']
        //     }
        // }

        // execute the query to find those matched limiting to 20
        user.find({}, {
            limit: 20
        }, function(err, users) {

            res.render('listUsers.jade', {
                users: users
            })
        })

    })
}