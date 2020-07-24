const db = require('../../dbConfig')

module.exports = {
  findById,
  add,
  remove
}


function findById(id) {
  return db('users')
  .where('id', id)
  .first()
}

function add(newUser) {
  return db('users')
  .insert(newUser, 'id').then(ids => {{id: ids[0]}})
}

function remove(id) {
  return db('users')
  .where('id', id)
  .del()
}