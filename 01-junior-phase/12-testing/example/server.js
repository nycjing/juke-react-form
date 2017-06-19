const express = require('express')
const {db} = require('./db')
const app = express()
const PORT = 3000

app.get('/', (req ,res, next) => {
  res.send('<div>Howdy!</div>')
})

app.get('/puppies', (req, res, next) => {
  res.send('<div>Puppies!</div>')
})

module.exports = app

// if this file was executed from the command line: node server.js
// if this file was required in by some other module: require('./server.js')
if (require.main === module) {
  db.sync({force: true}).then(() => console.log(`Database is synced`))
  app.listen(PORT, () => console.log(`Listening on PORT ${PORT}`))
}

