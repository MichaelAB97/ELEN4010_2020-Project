const path = require('path')
const router = require('express').Router()

router.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'views', 'default.html'))
})

router.get('/about', function (req, res) {
  res.sendFile(path.join(__dirname, 'views', 'about.html'))
})

router.get('/login', function (req, res) {
  res.sendFile(path.join(__dirname, 'views', 'login.html'))
})

router.get('/auth/login', function (req, res) {
  res.sendFile(path.join(__dirname, 'config', 'authorisation', 'views', 'unauthorised.html'))
})

router.get('/auth/login/dashboard', function (req, res) {
  res.sendFile(path.join(__dirname, 'views', 'dashboard.html'))
})

router.get('/home', function (req, res) {
  res.sendFile(path.join(__dirname, 'views', 'profile.html'))
})

module.exports = router
