const express = require('express')

const db = require('./values-model')
const db = require('../../dbConfig')

const value = express.Router()

value.get('/api/values', async(req, res, next) => {
  try {
    const values = db.find()
    res.json(values)
  }
  catch(err) {next(err)}
})


module.exports = value