module.exports = function(app) {

    app.get('/view/user/:user_id', function(req, res) {
        console.log("hi");
        // get the business collection
        var users = app.db.get('user')

         var q = {
            'user_id': req.params.user_id            
        }

        var user = users.findOne(q, function(err, item) {
            console.log(item);
            res.render('viewUser.jade', {
                user: item
            })
        })

    })
    
}