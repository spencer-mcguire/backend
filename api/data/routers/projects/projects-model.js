const db = require('../../dbConfig')

module.exports = {
  findByUserId,
  findById,
  add,
  remove
}


function findByUserId(userId) {
  return db('projects')
  .where('user_id', userId)
}

function findById(userId, id) {
  return db('projects')
  .where('user_id', userId)
  .where('id', id)
}

function add(newProject) {
  return db('projects')
  .insert(newProject, 'id').then(ids => {{id: ids[0]}})
}

function remove(id) {
  return db('projects')
  .where('id', id)
  .del()
}