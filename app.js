const express = require("express") //import express
const mysql = require("mysql") //import mysql

const app = express() //start server

//start our DB
const database = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'nodejs_login',
    port: '3306'
})

database.connect( (err) => {
    if (err) {
        console.log(err)
    }else {
        console.log("MYSQL Connected...")
    }
})

app.get("/", (req, res) => {
     res.send("<h1>Home Page<h1>")
})

app.listen(5000, () => {
    console.log("Server started on Port 5000")
}) //which port listen