var Promise = require('bluebird');
var router = require('express').Router();
var Hotel = require('../models').Hotel;
var Restaurant = require('../models').Restaurant;
var Activity = require('../models').Activity;
var Place = require('../models').Place;

router.get('/', function (req, res, next) {
    res.render('index');
});

router.get('/test/hotel', function (req, res, next) {
  Place.findOne({ where: { id: 1 }})
    .then(place => {
      // Okay :)
      const hotel = Hotel.build({ name: 'Codys Clubhouse' })
      hotel.setPlace(place)
      return hotel.save()
    })
    .then(savedHotel => {
      res.json(savedHotel)
    })
})

router.get('/options', function (req, res, next) {

    Promise.all([
        Hotel.findAll(),
        Restaurant.findAll(),
        Activity.findAll()
    ])
        .spread(function (hotels, restaurants, activities) {
            res.send({
                hotels: hotels,
                restaurants: restaurants,
                activities: activities
            });
        });

});

router.use('/api/days', require('./api/days'));

module.exports = router;
