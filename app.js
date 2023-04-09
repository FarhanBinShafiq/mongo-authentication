const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const cors = require('cors')

const ejs = require('ejs')
require("./config/database")
const User = require('./models/users.model')

//middleware
app.set("view engine", "ejs")
app.use(cors());
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(bodyParser.urlencoded({ extended: true }));

//base route
app.get('/', (req, res) => {
    res.render('index')
})

//Post-Register
app.post('/register', async (req, res) => {
    try {
        const userName = req.body.uname;
        const user = await User.findOne({ uname: userName })
        if (user) {
            return res.status(400).send('user exist !!')
        } else {
            const newUser = new User(req.body)
            await newUser.save()
            res.status(200).redirect('/login')
        }



    }


    catch (error) {
        res.status(500).send(error.message)
    }
})

//Get-Register
app.get('/register', (req, res) => {
    res.render('register')
})

//Post-Login
app.post('/login', (req, res) => {
    try {
        res.status(200).send('User Loggesd in')
    } catch (error) {
        res.status(500).send(error.message)
    }
})

//Get-Login
app.get('/login', (req, res) => {
    res.render('login')
})

//profile-get
app.get('/profile', (req, res) => {
    res.render('profile')
})

///logout
app.get('/logout', (req, res) => {
    res.redirect('/')
})



module.exports = app