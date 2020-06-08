const path = require('path')
const router = require('express').Router()

router.get('/', function (req, res) {
  res.send('Hello World!')
})

router.get('/about', function (req, res) {
  res.sendFile(path.join(__dirname, 'views', 'about.html'))
})

module.exports = router
