const path = require('path')
//const mysql = require("mysql");
//const sql = require('mssql');
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs"); //used to encrypt the users password
const database = require('./modules/database/db-connections'); // testing db-connection
const router = require('express').Router();

router.post('/login', function (req, res) {
    const { email, password } = req.body;
    if(!email || !password ) {
        console.log("One of both of the fields are empty");
        return res.status(400).redirect("/auth/login");
    }
  
    database.pools
      .then((pool) => {
        return pool.request()
          .query('SELECT * FROM BillCleave.Users where email = ?', [email] )
      })
      .then(result => {
        if(!result || !(bcrypt.compare(password, result[0].password) )){
            console.log("Username or password is incorrect")
            return res.status(401).redirect("/auth/login")
        } else {
            const id = result[0].id;
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
            res.cookie('cooks', token, cookieOptions);
            res.status(200).send("Login Successful");
        }
    })
})
module.exports = router

/*const db = mysql.createConnection({
    username: process.env.DB_SERVER_USERNAME,
    password: process.env.DB_SERVER_PASSWORD,
    host: process.env.DB_HOST,
    name: process.env.DB_NAME,

});*/


/*function login (request, response) {
    var username = request.body.username;
    var password = request.body.password;

    if (username && password) {
        var conn = new sql.ConnectionPool(dbconfig);
        conn.connect((function(){
            var thisConn = conn;
            var req = new sql.Request(thisConn);

            return function(){ //connect callback
            req.query('Select * from Admin where username = ? and password = ?', [username, password], 
            (function(){
                var req = request;
                var resp = response;
                var conn = thisConn;

                return function(error, results, fields) { // query callback
                    if (results.length > 0) {
                        req.session.loggedin = true;
                        req.session.username = username;
                        resp.redirect('/home');
                    } else {
                        response.send('Username and/or Password not found');
                    }
                    conn.close();
                    resp.end();
                };
            })());
            };
        })());
    } else {
      response.send('Please enter Username and Password');
    }
};*/

/*(async function () {
    try {
        let pool = await sql.connect(config)
        let result1 = await pool.request()
            .input('input_parameter', sql.Int, value)
            .query('select * from mytable where id = @input_parameter')
            
        console.dir(result1)
    
        // Stored procedure
        
        let result2 = await pool.request()
            .input('input_parameter', sql.Int, value)
            .output('output_parameter', sql.VarChar(50))
            .execute('procedure_name')
        
        console.dir(result2)
    } catch (err) {
        // ... error checks
    }
})()

sql.on('error', err => {
    // ... error handler
})
*/
/*function loginToDB() {
    var conn = new sql.ConnectionPool(dbConfig);
    conn.connect().then(function() {
        var req = new sql.Request(conn);
        req.query('').then(function(recordset) {
            console.log(recordset);
            conn.close();
        })
        .catch(function(err){
            console.log(err);
            conn.close();
        });
    })
    .catch(function(err){
        console.log(err);
    });
}*/



/*exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        if(!email || !password ) {
            console.log("One of both of the fields are empty");
            return res.status(400).redirect("/auth/login");
        }

        db.query('SELECT * FROM BillCleave.Users WHERE email = ?', [email], async (error, results) =>{
            console.log(results);
            if(!results || !(await bcrypt.compare(password, results[0].password) )){
                console.log("Username or password is incorrect")
                return res.status(401).redirect("/auth/login")
            }else {
                const id = results[0].id;
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
                res.cookie('cooks', token, cookieOptions);
                res.status(200).send("Login Successful");
            }
                

        })

    }catch (error) {
        console.log(error);
    }
}*/

