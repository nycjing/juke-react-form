const path = require('path')
const express = require('express')
const bodyParser = require('body-parser')
const nunjucks = require('nunjucks')
const volleyball = require('volleyball')
const db = require('./models')
const app = express()
const PORT = 3000

// logging middleware
app.use(volleyball)

// body parsing middleware
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

// template configuration
nunjucks.configure('views', {noCache: true})
app.set('view engine', 'html')
app.engine('html', nunjucks.render)

// static middleware
app.use(express.static(path.join(__dirname, 'public')))

// routing middleware
app.use(require('./routes'))

// 404 handler
app.use((req, res, next) => {
  const error = new Error('Not found')
  error.status = 404
  next(error)
})

// error handling "endware"
app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(err.status || 500)
  res.render('error', {err})
})

db.sync()
  .then(() => {
    console.log('Database is sync`d')
    app.listen(PORT, () => console.log(`Listening intently on PORT: ${PORT}`))
  })
