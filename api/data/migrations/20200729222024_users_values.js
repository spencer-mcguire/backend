
exports.up = function(knex) {
  return knex.schema.createTable('users_values', tbl => {
    tbl.int('user_id').references('id').inTable('users')
    tbl.int('value_id').references('id').inTable('values')
    tbl.primary(['user_id', 'value_id'])
  })
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('users_values')
};
