const router = require('express').Router()
const {Hotel, Activity, Restaurant, Place} = require('../models')
module.exports = router

router.get('/data-only', (req, res, next) => {
  // Promise.all([
  //   Hotel.findAll({include: [Place]}),
  //   Activity.findAll(),
  //   Restaurant.findAll()
  // ])
  Place.findAll({include: [Hotel, Activity, Restaurant]})
  .then((results) => {
    res.json(results)
  })
  .catch(next)

})
router.get('/', (req, res, next) => {

  Promise.all([
    Hotel.findAll(),
    Activity.findAll(),
    Restaurant.findAll()
  ])
  .then((results) => {
    const [hotels, activities, restaurants] = results
    res.render('index', {hotels, activities, restaurants})
  })
  .catch(next)
})

// THESE ARE ALL THE SAME
// .then(([hotels, activities, restaurants]) => {
    // console.log(hotels, activities, restaurants)

// const [hotels, activities, restaurants] = arrayOfResults
    // console.log(hotels, activities, restaurants)

// const hotels = arrayOfResults[0]
// const activities = arrayOfResults[1]
// const restaurants = arrayOfResults[2]
    // console.log(hotels, activities, restaurants)
// })
