const express = require('express')
const app = express()
const morgan = require('morgan')
const productRoute = require('./api/routes/products')
const orderRoute = require('./api/routes/orders')
const userRoute = require('./api/routes/user')
const bodyParser = require('body-parser')
const cors = require('cors')
const mongoose = require('mongoose')

mongoose.connect("mongodb://ben:"+
process.env.MONGO_ATLAS_PW
+"@ben-shard-00-00-3jkdt.mongodb.net:27017,ben-shard-00-01-3jkdt.mongodb.net:27017,ben-shard-00-02-3jkdt.mongodb.net:27017/test?ssl=true&replicaSet=Ben-shard-0&authSource=admin"  )
app.use(cors())
app.use(morgan('dev'))
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

// Routes which shouldhandle requrest
app.use('/products', productRoute)
app.use('/orderRoute', orderRoute)
app.use('/user', userRoute)

app.use((req, res, next) => {
  const error = new Error('Route Not found')
  error.status = 404
  next(error)
})

app.use((error, req, res, next) => {
  res.status(error.status)
  res.json({
    error: {
      message: error.message
    }
  })
})
module.exports = app
