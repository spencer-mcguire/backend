const express = require('express')
const bcrypt = require('bcryptjs')

const db = require('./users-model')

const user = express.Router()

const authError = {err: 'Invalid Credentials'}


// REGISTER
user.post('/register', validateUserInfo(), async(req, res, next) => {
  try {
    const {username, password} = req.body

    const existingUser = await db.findByUsername(username).first()

    if(existingUser) {return res.status(409).json({err: 'This username is taken'})}

    const newUser = await db.add({username, password: await bcrypt.hash(password, 10)})

    res.status(201).json({msg: 'user created'})
  }
  catch(err) {next(err)}
})

// LOGIN
user.post('/login', validateUserInfo(), async(req, res, next) => {
  try{
    const {username, password} = req.body

    const user = await db.findByUsername(username)
  
    if(!user) {res.status(401).json(authError)}
  
    const checkPassword = await bcrypt.compare(password, user.password)
  
    if (!checkPassword) {res.status(401).json(authError)}
  
    req.session.user = user
    res.json({msg: `Welcome ${user.username}`})
  }
  catch(err) {next(err)}
})

user.get('/logout', async(req, res, next) => {
  try {
    req.session.destroy(err => {
      if(err) {next(err)}
      else {res.sendStatus(204)}
    })
  }
  catch(err) {next(err)}
})

function validateUserInfo() {
  return (req, res, next) => {
    if (!req.body.username || !req.body.password) {
      return res.status(400).json({err: 'username AND password are required'})
    }
    else {next()}
  }
}
module.exports = user