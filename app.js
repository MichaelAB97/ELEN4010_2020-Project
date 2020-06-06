'use strict'

if (process.env.NODE_ENV = 'development') { require('dotenv').config() }
const database = require('./modules/database/db-connections') // testing db-connection
const express = require('express')
const app = express()

// loading our router
const appRouter = require('./appRoutes.js')

// mounting our router
app.use('/', appRouter)

const port = process.env.PORT || 3000
app.listen(port)
console.log('Express server running on port', port)
