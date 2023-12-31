//Import Dependencies
const express = require('express') // import express framework
require('dotenv').config() // import/load ENV variables
const path = require('path') // import path module
const middleware = require('./utils/middleware')

//Import Routers
const UserRouter = require('./controllers/userControllers')
const RecipeRouter = require('./controllers/recipeControllers')

//Create the app object + set up view engine
const app = express() // call the express function

// view engine - ejs
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

//Middleware
middleware(app)

//Routes
app.get('/', (req, res) => {
    const { username, loggedIn, userId } = req.session
//    res.send('the app is connected')
    res.render('home.ejs', { username, loggedIn, userId})
})

app.use('/users', UserRouter)
app.use('/recipes', RecipeRouter)

//error page
app.get('/error', (req, res) => {
    const error = req.query.error || 'Try again'
    const { username, loggedIn, userId } = req.session
    res.render('error.ejs', { error, userId, username, loggedIn })
})

//Server Listener
const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log('Your server is running')
})