module.exports = function(app) {
    
    app.get('/list/users', function(req, res) {

        // get the user collection
        var user = app.db.get('user')


        // execute the query to find those matched limiting to 20
        user.find({}, {
            limit: 20
        }, function(err, u) {

            res.render('listUsers.jade', {
                users: u
            })
        })

    })
}