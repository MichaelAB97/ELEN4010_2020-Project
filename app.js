'use strict'

if (process.env.NODE_ENV = 'development') { require('dotenv').config() }
const database = require('./modules/database/db-connections') // testing db-connection
const express = require('express')
const app = express()
const cookieParser = require('cookie-parser');
app.use(express.urlencoded({ extended: false}));
app.use(express.json());
app.use(cookieParser());

// loading our router
const appRouter = require('./appRoutes.js')

// mounting our router
app.use('/', appRouter)

app.use('/auth', require('./config/auth.js'))

const port = process.env.PORT || 3000
app.listen(port)
console.log('Express server running on port', port)
