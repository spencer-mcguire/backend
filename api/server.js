const express = require('express')
const cors = require('cors')

// const session = require('express-session')
// const KnexSessionStore = require('connect-session-knex')(session)

const dbConfig = require('./data/dbConfig')

const server = express()

// import routers
const userRouter = require('./data/routers/users/users-router')

server.use(express.json())
server.use(cors())
// server.use(session({
//   resave: false,
//   saveUninitialized: false,
//   secret: 'cake',
//   store: new KnexSessionStore({
//     knex: dbConfig,
//     createtable: true
//   })
// }))

// err mw
server.use((err, req, res, next) => {
  console.error(err)
  res.status(500).json({err: 'Something went wrong...'})
  next()
})

// init routers
server.use('/api/users',userRouter )

module.exports = server 