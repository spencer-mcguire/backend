const { findById } = require('../projects/projects-model')

db = require('../../dbConfig')

module.exports = find

function find() {
  return db('values')
}