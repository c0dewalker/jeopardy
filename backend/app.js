require('dotenv').config()
const express = require('express')
const path = require('path')
const createError = require('http-errors')
const cookieParser = require('cookie-parser')
const logger = require('morgan')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const cors = require('cors')

mongoose.connect(process.env.MONGO_CONNECT, { useNewUrlParser: true })

const session = require('express-session')
const passportSession = require('passport-session')
const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const sha256 = require('sha256')
const indexRouter = require('./routes/index')
const User = require('./models/user')

const app = express()

app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'hbs')

app.use(session({ secret: 'very difficult key', resave: false, saveUninitialized: false }))
app.use(passport.initialize())
app.use(passport.session())

app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json({ extended: true }))

const corsOptions = {
  origin: 'http://localhost:3000',
  optionsSuccessStatus: 200,
  credentials: true
}

app.use(cors(corsOptions))


app.post('/signup', async (req, res, next) => {
  const { name, email, password } = req.body
  const candidate = await User.findOne({ email })
  if (!name || !email || !password) {
    res.status(400)
    return res.json({ message: 'Fill out all fields!' })
  } else if (candidate) {
    res.status(400)
    return res.json({ message: 'User with this email already exists!' })
  }
  const newUser = new User({
    name,
    email,
    password: sha256(password),
  })
  newUser.save()
  req.login(newUser, function (err) {
    if (err) { return next(err) }
    return res.json({ username: newUser.name, _id: newUser._id })
  })
})

app.post('/login', async (req, res, next) => {
  const { email, password } = req.body
  const user = await User.findOne({ email })
  if (!email || !password) {
    return res.json({ message: 'Fill out all fields!' })
    res.status(400)
  }
  else if (!user) {
    res.status(404)
    return res.json({ message: 'No user with this email. Please sign up.' })
  }
  else if (user.password !== sha256(password)) {
    res.status(400)
    return res.json({message: 'Wrong password!'})
  }
  else {
    req.login(user, function (err) {
      if (err) { return next(err) }
      return res.json({ username: user.name, _id: user._id })
    })
  }
})


passport.serializeUser((user, done) => done(null, user))
passport.deserializeUser((user, done) => done(null, user))


app.use('/', indexRouter)


// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404))
})

// error handler
app.use(function (err, req, res) {
  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}

  // render the error page
  res.status(err.status || 500)
  res.render('error')
})

module.exports = app
