const mongoose = require('mongoose')
const restaurant = require('../restaurant')
const restaurantListDB = require('../../restaurant.json').results

mongoose.connect('mongodb://localhost/restaurant-list', { useNewUrlParser: true, useUnifiedTopology: true })

const db = mongoose.connection

db.on('error', () => {
  console.log('mongodb error!')
})

db.once('open', () => {
  console.log('mongodb connected!')
})

for (let i = 0; i < restaurantListDB.length; i++) {
  restaurant.create(restaurantListDB[i])

  console.log('done!')
}