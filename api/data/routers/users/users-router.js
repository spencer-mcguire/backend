const express = require('express')
const bcrypt = require('bcryptjs')
const session = require('express-session')

const db = require('./users-model')

const user = express.Router()

const authError = {err: 'Invalid Credentials'}
const welcomeMsg = {msg: `Welcome ${user.username}`}
// REGISTER
user.post('/api/users/register', async(req, res, next) => {
  try {
    const {username, password} = req.body

    const existingUser = db.findByUsername(username)

    if(existingUser) {res.status(409).json({err: 'This username is taken'})}

    const newUser = db.add({username, password: await bcrypt.hash(password, 10)})

    if (newUser) {res.status(201).json({msg: `user created. id: ${newUser}`})}
  }
  catch(err) {next(err)}
})

// LOGIN
user.post('/api/users/login', async(req, res, next) => {
  try{
    const {username, password} = req.body

    const user = db.findByUsername(username)
  
    if(!user) {res.status(401).json(authError)}
  
    const checkPassword = await bcrypt.compare(password, user.password)
  
    if (!checkPassword) {res.status(401).json(authError)}
  
    req.session.user = user
    res.json(welcomeMsg)
  }
  catch(err) {next(err)}
})

user.get('/api/users/logout', async(req, res, next) => {
  try {
    req.session.destroy(err => {
      if(err) {next(err)}
      else {res.sendStatus(204)}
    })
  }
  catch(err) {next(err)}
})

module.exports = user