module.exports = function(app) {

    app.get('/view/user/:id', function(req, res) {

        // get the business collection
        var users = app.db.get('user')

         var q = {
            'user_id': String(req.params.id)
        }



        var user = users.findOne(q, function(err, item) {
            res.render('viewUser.jade', {
                user: item
            })
        })

    })
}
