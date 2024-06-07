const express = require("express") //import express
const mysql = require("mysql") //import mysql
const dotenv = require("dotenv")
const path = require("path")

dotenv.config({ path: './.env' }) 
//it takes care of sensitive variables

const app = express() 
//start server

//start our DB
const database = mysql.createConnection({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE,
    port: process.env.DATABASE_PORT
})

//where Im gonna store some css and js files that Im using
// __dirname variable from nodejs that gives access to the current
//directory
const publicDirectory = path.join(__dirname, './public')
//console.log(__dirname)
//make sure express is using public directory
app.use(express.static(publicDirectory))

//Parse URL encoded bodies (as sent by HTML forms)
app.use(express.urlencoded({ extended: false }))
//Parse JSON bodies (as sent by API clients)
app.use(express.json())

//which view engine I'm using
app.set('view engine', 'hbs')

database.connect( (err) => {
    if (err) {
        console.log(err)
    }else {
        console.log("MYSQL Connected...")
    }
})

//Define Router
//Any occurency of '/' it will verify on routes/pages if the route exist 
app.use('/', require('./routes/pages'))
app.use('/auth', require('./routes/auth'))

app.listen(5000, () => {
    console.log("Server started on Port 5000")
}) //which port listen