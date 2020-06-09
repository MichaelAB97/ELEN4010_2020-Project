const path = require('path')
const mysql = require("mysql");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs"); //used to encrypt the users password


const db = mysql.createConnection({
    username: process.env.DB_SERVER_USERNAME,
    password: process.env.DB_SERVER_PASSWORD,
    host: process.env.DB_HOST,
    name: process.env.DB_NAME,

});

exports.login = async (req, res) => {
    try {
        const { username, password } = req.body;

        if(!username || !password ) {
            console.log("One of both of the fields are empty");
            return res.status(400).redirect("/auth/login");
        }

        db.query('SELECT * FROM users WHERE username = ?', [username], async (error, results) =>{
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
}
