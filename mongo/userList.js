module.exports = function(app) {
    
    app.get('/list/users', function(req, res) {

        // get the user collection
        var users = app.db.get('user')

        // compose a query to look up docs whose 'categories' field contains the word 'Doctors'
        var q = {
            'type': {
                $in: ['user']
            }
        }

        // execute the query to find those matched limiting to 20
        users.find(q, {
            limit: 20
        }, function(err, users) {

            res.render('listUsers.jade', {
                users: users
            })
        })

    })
}