const path = require('path')
var express = require('express')
const router = express.Router()

router.get('/', function (req, res) {
  res.send('Hello World!')
})

router.get('/about', function (req, res) {
  res.sendFile(path.join(__dirname, 'views', 'about.html'))
})

module.exports = router
