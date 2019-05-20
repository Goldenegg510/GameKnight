require('dotenv').config()
app.use( express.static( `${__dirname}/../build` ) );
const express = require('express')
const app = express()
const massive = require('massive')
const session = require('express-session')
const { SESSION_SECRET, CONNECTION_STRING, SERVER_PORT } = process.env
const auth_controller = require('./controllers/auth_controller')
const group_controller = require('./controllers/group_controller')
const event_controller = require('./controllers/event_controller')

app.use(express.json())
app.use(session({
  secret: SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 60 * 60 * 24 * 1000 * 365
  }
}))

massive(CONNECTION_STRING).then((database) => {
  app.set('db', database)
  console.log('smart stuff happening on the database')
  app.listen(SERVER_PORT, () => {
    console.log('port', SERVER_PORT, 'active')
  })
})

app.post('/auth/register', auth_controller.register)
app.post('/auth/login', auth_controller.login)
app.get('/groups/:user_id', group_controller.getUserGroups)
app.get('/group/events/:group_id', event_controller.getGroupEvents)
app.get('/user_data', auth_controller.userData)
app.post('/add_event', event_controller.addEvent)
app.get('/event/:new_event_id', event_controller.getEventById)