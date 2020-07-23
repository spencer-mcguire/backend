
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        {id: 1, username: 'blakedavis', password: 'essential'},
        {id: 2, username: 'erinpicazo', password: 'essential'},
        {id: 3, username: 'didi', password: 'essential'},
        {id: 4, username: 'val', password: 'essential'},
      ]);
    });
};
