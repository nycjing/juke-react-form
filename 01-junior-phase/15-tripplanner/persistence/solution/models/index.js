var db = require('./_db');

var Place = require('./place');
var Hotel = require('./hotel');
var Restaurant = require('./restaurant');
var Activity = require('./activity');
var Day = require('./day');

// adds: hotel.getPlace and hotel.setPlace
Hotel.belongsTo(Place);

// adds: restaurant.getPlace and restaurant.setPlace
Restaurant.belongsTo(Place);

// adds: activity.getPlace and activity.setPlace
Activity.belongsTo(Place);

Day.belongsTo(Hotel);
Day.belongsToMany(Restaurant, { through: 'day_restaurants' });
Day.belongsToMany(Activity, { through: 'day_activities' });

module.exports = {
	db,
	Place,
	Hotel,
	Restaurant,
	Activity,
	Day
};


/***
// instance not yet saved in the database
const hotel = Hotel.build({})
hotel.save()
  .then(savedHotel => {
    // hotel that was definitely saved in the database
    savedHotel.setPlace(place)
  })
**/





