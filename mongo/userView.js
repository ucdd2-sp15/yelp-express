module.exports = function(app) {

    // TODO
    app.get('/view/user/:user_id', function(req, res) {

        // get the user collection
        var users = app.db.get('user')
        console.log(users)
         var q = {
            'user_id': req.params.user_id            
        }

        var user = users.findOne(q, function(err, item) {

            res.render('viewUser.jade', {
                user: item
            })
        })

    })
}