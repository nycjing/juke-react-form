const db = require('./_db')
const Activity = require('./activity')
const Place = require('./place')
const Hotel = require('./hotel')
const Restaurant = require('./restaurant')

Activity.belongsTo(Place)
Restaurant.belongsTo(Place)
Hotel.belongsTo(Place)
Place.hasOne(Activity)
Place.hasOne(Restaurant)
Place.hasOne(Hotel)

module.exports = {
  db,
  Activity,
  Hotel,
  Restaurant,
  Place
}
