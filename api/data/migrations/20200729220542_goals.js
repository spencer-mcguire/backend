
exports.up = function(knex) {
  return knex.schema.createTable('goals', tbl => {
    tbl.increments()
    tbl.int('user_id').references('id').inTable('users').onUpdate('CASCADE').onDelete('CASCADE')
    tbl.string('title')
    tbl.string('date')
  })
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('goals')
};
