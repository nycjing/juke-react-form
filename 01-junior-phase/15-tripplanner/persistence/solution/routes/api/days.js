var express = require('express');
var router = express.Router();
module.exports = router;

var Day = require('../../models/day');
var Hotel = require('../../models/hotel');
var Restaurant = require('../../models/restaurant');
var Activity = require('../../models/activity');

// -- Day specific

// Get all days with attraction information
// GET /api/days
router.get('/', function (req, res, next) {
    Day.findAll({
        include: [Hotel, Restaurant, Activity],
        order: 'number ASC'
    })
        .then(function (days) {
            res.send(days);
        })
        .catch(next);
});

// Create a new day with no attractions
// POST /api/days
router.post('/', function (req, res, next) {

    Day.create(req.body)
        .then(function (createdDay) {
            res.status(201).send(createdDay);
        })
        .catch(next);

});

// This helps us DRY out our code!
router.param('dayId', function (req, res, next, theDayId) {
    Day.findById(theDayId)
        .then(function (foundDay) {
            req.day = foundDay;
            next();
            return null; // quiets Bluebird re: un-returned promise in handler
        })
        .catch(next);
});

// Delete a day using that day's id
// DELETE /api/days/2
router.delete('/:dayId', function (req, res, next) {
        req.day.destroy()
        .then(function () {
            res.sendStatus(204);
        })
        .catch(next);
});

// ---

// -- Attractions on days

// Register a hotel to a day
// PUT /api/days/2/hotel
router.put('/:dayId/hotel', function (req, res, next) {
    req.day.setHotel(req.body.hotelId)
        .then(function (day) {
            res.sendStatus(204);
        })
        .catch(next);
});
// Register a restaurant to a day
// PUT /api/days/2/restaurants

router.put('/:dayId/restaurants', function (req, res, next) {
    req.day.addRestaurant(req.body.restaurantId)
        .then(function () {
            res.sendStatus(204);
        })
        .catch(next);
});

// Register an activity to a day
// PUT /api/days/2/activities

router.put('/:dayId/activities', function (req, res, next) {
    req.day.addActivity(req.body.activityId)
        .then(function () {
            res.sendStatus(204);
        })
        .catch(next);
});

// Remove a hotel from a day
// DELETE /api/days/2/hotel

router.delete('/:dayId/hotel', function (req, res, next) {
    req.day.setHotel(null)
        .then(function () {
            res.sendStatus(204);
        })
        .catch(next);
});

// Remove a restaurant from a day
// DELETE /api/days/2/restaurants/16
router.delete('/:dayId/restaurants/:restaurantId', function (req, res, next) {
    req.day.removeRestaurant(req.params.restaurantId)
        .then(function () {
            res.sendStatus(204);
        })
        .catch(next);
});

// Remove an activity from a day
// DELETE /api/days/2/activities/3
router.delete('/:dayId/activities/:activityId', function (req, res, next) {
    req.day.removeActivity(req.params.activityId)
        .then(function () {
            res.sendStatus(204);
        })
        .catch(next);
});

// ---
