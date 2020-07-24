const express = require('express')
const cors = require('CORS')
const session = require('express-session')
const KnexSessionStore = require('connect-session-knex')

const dbConfig = require('./data/dbConfig')

const server = express()

// import routers

server.use(express.json())
server.use(cors())
server.use(session({
  resave: false,
  saveUninitialized: false,
  secret: 'cake',
  store: new KnexSessionStore({
    knex: dbConfig,
    createTable: true
  })
}))

// err mw
server.use((err, req, res, next) => {
  console.log(err)
  next()
})

// init routers

module.exports = server 