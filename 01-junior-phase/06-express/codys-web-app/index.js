const express = require('express')
const bodyParser = require('body-parser')

const app = express()

const databaseOfToys = [{ id: 1, name: 'bb8' }]


app.use(bodyParser.json())
app.use(bodyParser.urlencoded())

app.use(function (req, res, next) {

  console.log('Request body: ', req.body)

  setTimeout(() => {
    console.log(`Verb: ${req.method} URI: ${req.url}`)
    next()

  }, 500)

})

// GET /
app.get('/', function (request, response, next) {

    response.send('<h1>Welcome to Codys Website</h1>')

})


// GET /toys
app.get('/toys', (request, response) => {

  console.log(request.query.name)

  response.send(JSON.stringify(databaseOfToys))

})

// app.get('/toys/favorite/', (req, res) => {
//
// })

// GET /toys/:toyId
app.get('/toys/:id', (req, res) => {

  // const ourToyId = req.toyId // string, not a number
  console.log(req.params.id)
  res.send(`<div> Page for ${req.params.id} </div>`)

})


// POST /toys
app.post('/toys', (req, res, next) => {

  const newToy = req.body
  newToy.id = databaseOfToys.length + 1
  databaseOfToys.push(newToy)

  res.status(201).send('You created a new toy - thanks!' + JSON.stringify(newToy))


})

app.listen(3000)
