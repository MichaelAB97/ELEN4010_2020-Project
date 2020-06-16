'use strict'

if (process.env.NODE_ENV = 'development') { require('dotenv').config() }
const database = require('./modules/database/db-connections') // testing db-connection
const express = require('express')
var session = require('express-session')
var flash = require('express-flash-messages')

const { v4: uuidv4 } = require('uuid')
const app = express()
const cookieParser = require('cookie-parser')

app.use(cookieParser())

// loading body parser
const bodyParser = require('body-parser')
// tell express to use body parser for JSON and URL encoded form bodies
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

const sessionStore = database.sessionStoreConnection
app.use(session({
  genid: (req) => {
    return uuidv4() // use UUIDs for session IDs
  },
  store: sessionStore,
  secret: process.env.SESSION_SECRETE,
  resave: false,
  saveUninitialized: true,
  cookie: { originalMaxAge: 6 * 600000 } // 60min
}))

app.use('/cdn', express.static('public'))

// loading our routers
const appRouter = require('./appRoutes.js')
const signupRouter = require('./routes/signUpRoutes.js')
const signInRouter = require('./routes/signInRoutes.js')
const profileRoutes = require('./routes/profileRoutes')
app.use(flash())
// mounting our router
app.use('/', appRouter)
app.use('/cdn', express.static('public'))
app.use('/signUp', signupRouter)
app.use('/login', signInRouter)
app.use('/login/user', profileRoutes)

const port = process.env.PORT || 3000
app.listen(port)
console.log('Express server running on port', port)
