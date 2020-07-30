const express = require('express')
const db = require('./goals-model')

const goal = express.Router()

goal.get('/api/goals/:userId', async(req, res, next) => {
  try {
    const goals = await db.find(req.params.userId)
    
    res.json(goals)
  }
  catch(err) {next(err)}
})

// add a goal
goal.post('/api/goals/:userId', async(req, res, next) => {
  try {
    const newGoal = await db.add({...req.body, user_id: req.params.userId})

    res.status(201).json(newGoal)
  }
  catch(err) {next()}
})

module.exports = goal