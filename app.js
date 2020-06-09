'use strict'

if (process.env.NODE_ENV = 'development') { require('dotenv').config() }
const database = require('./modules/database/db-connections') // testing db-connection
const express = require('express')
const app = express()
const cookieParser = require('cookie-parser');

app.use(cookieParser());

// loading body parser
let bodyParser = require('body-parser')

// tell express to use body parser for JSON and URL encoded form bodies
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

// loading our router
const appRouter = require('./appRoutes.js')

// mounting our router
app.use('/', appRouter)

app.use('/auth', require('./auth.js'))

const port = process.env.PORT || 3000
app.listen(port)
console.log('Express server running on port', port)
