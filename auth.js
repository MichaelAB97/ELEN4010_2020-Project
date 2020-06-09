/*let path = require('path');
let express = require('express');
let router = express.Router();
//const authController = require('../config/authorisation/auth');
const database = require('./modules/database/db-connections') // testing db-connection

//authRouter.post('/login', authController.login );*/



//module.exports = authRouter;

let path = require('path')
//const mysql = require("mysql");
//const sql = require('mssql');
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs"); //used to encrypt the users password
const database = require('./modules/database/db-connections'); // testing db-connection
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
            /*const id = result[0].userId;
            const token = jwt.sign({id}, process.env.JWT_SECRET, {
                expiresIn: process.env.JWT_EXPIRES_IN
            });
            console.log("token: " + token);

            const cookieOptions = {
                expires: new Date(
                    Date.now() + process.env.JWT_COOKIE_EXPIRES * 24 * 60 * 60 * 1000
                ),
                httpOnly: true
            }
            res.cookie('cooks', token, cookieOptions);*/
            res.status(200).send("Login Successful");
        }
    })
})
module.exports = router