let path = require('path')
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const database = require('./modules/database/db-connections');
const router = require('express').Router();

router.post('/login', function (req, res) {
    const { username, password } = req.body;
    if(!username || !password ) {
        console.log("One of both of the fields are empty");
        return res.status(400).redirect("/auth/login");
    }
  
    database.pools
      .then((pool) => {
        return pool.request()
          .query('SELECT * FROM BillCleave.Users WHERE username= (\'' + username+ '\')')
      })
      .then(result => {
        console.log("log: ", result);
        if(!result || !(bcrypt.compare(password, result.recordset[0].password) )){
            console.log("Username or password is incorrect")
            return res.status(401).redirect("/auth/login")
        } else {
            res.status(200).send("Login Successful");
        }
    })
})
module.exports = router