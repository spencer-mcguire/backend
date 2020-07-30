const db = require('../../dbConfig')

module.exports = {
  find,
  add
}

function find(userId) {
  return db('goals')
  .where('user_id', userId)
}