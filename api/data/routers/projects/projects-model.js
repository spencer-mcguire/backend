const db = require('../../dbConfig')

module.exports = {
  findById,
  add,
  remove
}


function findById(id) {
  return db('projects')
  .where('id', id)
  .first()
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