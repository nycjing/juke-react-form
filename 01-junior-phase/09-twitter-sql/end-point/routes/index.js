'use strict';
var express = require('express');
var router = express.Router();
var client = require('../db');

// a reusable function
function respondWithAllTweets (req, res, next){
  client.query('SELECT * FROM users INNER JOIN tweets ON tweets.user_id = users.id', function(err, result) {
    if (err) next(err);
    else {
      var allTheTweets = result.rows;
      res.render('index', {
        title: 'Twitter.js',
        tweets: allTheTweets,
        showForm: true
      });
    }
  });
}

// here we basically treet the root view and tweets view as identical
router.get('/', respondWithAllTweets);
router.get('/tweets', respondWithAllTweets);

// single-user page
router.get('/users/:username', function(req, res, next){
  var user = req.params.username;
  console.log(user)
  client.query('SELECT * FROM users JOIN tweets ON users.id = tweets.user_id WHERE users.name = $1', [user], function(err, result) {
    if (err) return next(err);
    var tweetsForName = result.rows;

    res.render('index', {
      title: 'Twitter.js',
      tweets: tweetsForName,
      showForm: true,
      username: user
    });
  });
});

// single-tweet page
router.get('/tweets/:id', function(req, res, next){
  var tweetId = req.params.id;
  client.query('SELECT * FROM users INNER JOIN tweets ON users.id = tweets.user_id WHERE tweets.id = $1', [tweetId], function(err, result){
    if (err) return next(err);
    var tweetsWithThatId = result.rows;

    res.render('index', {
      title: 'Twitter.js',
      tweets: tweetsWithThatId // an array of only one element ;-)
    });
  });
});

// create a new tweet
router.post('/tweets', function(req, res, next){

  // find user by name
  // if no user 
        // create user
  // make new tweet with user id


  // messy version that we cleaned up:
  // client.query('SELECT * FROM users WHERE name = $1', [req.body.name], function(err, result){
  //   if(err) return next(err)
  //   if(!result.rows.length){
  //     client.query('INSERT INTO users (name, picture_url) VALUES ($1, $2) RETURNING *', [req.body.name, `http://lorempixel.com/48/48?name=${req.body.name}`], function(err, result){
  //       var user = result.rows[0]
  //       client.query('INSERT INTO tweets (user_id, content) VALUES ($1, $2) RETURNING *', [user.id, req.body.content], function(err, content){
  //         res.redirect('/')
  //       })        
  //     })
  //   } else {
  //     var user = result.rows[0]
  //     client.query('INSERT INTO tweets (user_id, content) VALUES ($1, $2) RETURNING *', [user.id, req.body.content], function(err, content){
  //       res.redirect('/')
  //     })
  //   }
  // })


  // refactored version
  client.query('SELECT * FROM users WHERE name = $1', [req.body.name], checkForUser)

  function checkForUser(err, result){
    if(err) next(err)
    if(!result.rows.length){
      client.query('INSERT INTO users (name, picture_url) VALUES ($1, $2) RETURNING *', [req.body.name, `http://lorempixel.com/48/48?name=${req.body.name}`], makeNewTweet)
    } else {
      makeNewTweet(null, result)     
    }
  }  

  function makeNewTweet(err, result){
    var user = result.rows[0]
    client.query('INSERT INTO tweets (user_id, content) VALUES ($1, $2) RETURNING *', [user.id, req.body.content], function(err, content){
      if(err) next(err)
      res.redirect('/')
    })
  }
 

});

module.exports = router;