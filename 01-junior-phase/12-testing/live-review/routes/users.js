const express = require('express');
const router = express.Router();
const models = require('../models');
const Page = models.Page;
const User = models.User;
const Promise = require('bluebird');
module.exports = router;


// GET /users
router.get('/', function (req, res, next) {

    User.findAll()
        .then(function (users) {
            res.render('users', {
                users: users
            });
        })
        .catch(next);

});

// GET /users/id
router.get('/:userId', function (req, res, next) {

    var findingUserPages = Page.findAll({
        where: {
            authorId: req.params.userId
        }
    });

    var findingUser = User.findById(req.params.userId);

    Promise.all([
        findingUserPages, findingUser
    ])
        // can also be .spread(pages, user)
        .then(function (values) {

            var pages = values[0];
            var user = values[1];

            user.pages = pages;

            res.render('userpage', {
                user: user
            });

        })
        .catch(next);

});
