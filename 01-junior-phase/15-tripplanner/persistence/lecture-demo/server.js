const path = require('path')
const express = require('express')
const bodyParser = require('body-parser')
const morgan = require('morgan')
const Sequelize = require('sequelize')
const db = new Sequelize('postgres://localhost:5432/codys-clubhouse', { logging: false })
const PORT = 3000

const Toy = db.define('toy', {
  name: Sequelize.STRING
})

db.sync().then(() => console.log('db is synced!'))

express()

  .use(morgan('dev'))

  .use(bodyParser.json())
  .use(bodyParser.urlencoded({ extended: false }))

  .use(express.static(path.join(__dirname, 'node_modules')))
  .use(express.static(path.join(__dirname, 'public')))

  .get('/api/toys', function (req, res, next) {
    Toy.findAll()
      .then(toys => {
        // res.setHeader('Content-Type', 'application/json')
        // res.send(toys)
        res.json(toys) // Content-Type: 'application/json'
      })
      .catch(next)
  })

  .post('/api/toys', function (req, res, next) {
    const toyName = req.body.toyName
    Toy.create({name: toyName})
      .then(newToy => {
        res.json(newToy)
      })
      .catch(next)
  })

  .get('/', function (req, res, next) {
    res.sendFile(path.join(__dirname, 'index.html'))
  })

  .listen(PORT, () => console.log(`Arf, come check out http://localhost:${PORT}`))

