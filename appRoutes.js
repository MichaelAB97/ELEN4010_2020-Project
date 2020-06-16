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

// Updating user information
const user1 = {
  name: 'username',
  email: 'user@domain.com',
  password: 'default'
}

router.get('/edit', function (req, res) {
  res.sendFile(path.join(__dirname, 'views', 'edit.html'))
})

router.post('/api/edit', function (req, res) {
  // const { username, email, userID } = req.body
  user1.name = req.body.username
  user1.email = req.body.email
  user1.password = req.body.password
  console.log('editing a student entry', req.body)
  res.redirect(req.baseUrl + '/api/list')
})

router.get('/api/list', function (req, res) {
  // res.json(user1) // Respond with JSON
  res.sendFile(path.join(__dirname, 'views', 'profile.html'))
})

module.exports = router
