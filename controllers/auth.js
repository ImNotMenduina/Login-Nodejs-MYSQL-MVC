//Request.body is what comes from forms

const mysql = require("mysql") //import mysql

//encrypt password
//const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')

const database = mysql.createConnection({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE,
    port: process.env.DATABASE_PORT
})

exports.register = (req, res) => {
    console.log(req.body)

    //const name = req.body.name
    //const email = req.body.email
    //const password = req.body.password
    //const passwordConfirm = req.body.passwordConfirm

    //destructuring 
    const { name, email, password, passwordConfirm } = req.body

    database.query('SELECT email FROM users WHERE email = ?', [email], async (error, result) => {
        if (error) {
            console.log(error)
        }
        if (result.length > 0) {
            return res.render('register', {
                message: 'That email is already in use'
            })
        } else if ( password !== passwordConfirm ) {
            return res.render('register', {
                message: 'Passwords do not match'
            })
        }

        let hashedPassword = await bcrypt.hash(password, 8) // 8 rounds of encryption
        console.log(hashedPassword)

        database.query('INSERT INTO users SET ?', {name: name, email: email, password: hashedPassword }, (error, result) => {
            if (error) {
                console.log(error)
            } else {
                //console.log(result)
                return res.render('register', {
                    message: 'User successfully registered'
                })
            }
        })
    })
}