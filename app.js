var express = require('express')
var app = express()

var _ = require('lodash')

var doctors = require('./data/doctors.json')
var restaurants = require('./data/restaurants.json')
var users = require('./data/users.json')
var tips = require('./data/tips.json')

// use jade as the view engine
app.set('view engine', 'jade');
// Hosting
// set where the static contents are (e.g., css, js)
app.use(express.static(__dirname + '/public'));

app.get('/list/restaurants', function(req, res) {
    res.render('listRestaurants.jade', {
        restaurants: restaurants
    })
})

app.get('/list/users', function(req, res) {
    res.render('listUsers.jade', {
        users: users
    })
})

app.get('/list/doctors', function(req, res) {
    res.render('listDoctors.jade', {
        doctors: doctors
    })
})

app.get('/list/tips', function(req, res) {
    res.render('listTips.jade', {
        tips: tips
    })
})

app.get('/view/user/:user_id', function(req, res) {
    // TODO: lookup a user by a user_id
    // hint: use lodash's find function to look up a user by user_id
    var user = _.find(users, {'user_id' : req.params.user_id})
    res.render('viewUser.jade', {
        user: user
    })
})

app.get('/view/restaurant/:business_id', function(req, res) {
    var restaurant = _.find(restaurants, {'business_id' : req.params.business_id})
    res.render('viewRestaurant.jade', {
        restaurant: restaurant
    })
})

app.get('/view/doctor/:business_id', function(req, res) {
    var doctor = _.find(doctors, {'business_id' : req.params.business_id})
    res.render('viewDoctor.jade', {
        doctor: doctor
    })
})

app.get('/view/tip/:business_id/:user_id', function(req, res) {
    // TODO: lookup a tip by both the business_id and the user_id
    var tip = _.find(tips, { 'business_id': req.params.business_id, 'user_id': req.params.user_id})
    var restaurant = _.find(restaurants, {'business_id': req.params.business_id})
    //tip['name'] = restaurant.name
    res.render('viewTip.jade', {
        tip: tip,
        restaurant: restaurant
    })
})

// TODO: individual homework
var plugin = require('./search')
plugin(app)

var server = app.listen(process.env.PORT || 3000, function() {
require('./mongo')(app)

var server = app.listen(3000, function() {
    var host = server.address().address
    var port = server.address().port

    console.log('App listening at http://%s:%s', host, port)
})
