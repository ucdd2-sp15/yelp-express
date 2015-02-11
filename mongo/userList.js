module.exports = function(app) {
    
    app.get('/list/users', function(req, res) {

        // get the business collection
        var user = app.db.get('user')

        // compose a query to look up docs whose 'categories' field contains the word 'Doctors'
        var q = {
            'type': {
                $in: ['user']
            }
        }

        // execute the query to find those matched limiting to 20
        user.find(q, {
            limit: 20
        }, function(err, usr) {

            res.render('listUsers.jade', {
                users: usr
            })
        })

    })
}