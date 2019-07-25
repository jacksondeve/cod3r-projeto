
exports.up = function(knex, Promise) {
  return knex.schema.altertable('users', function (table) {
      table.timestamp('deleteAT')
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.altertable('users', function (table) {
      table.dropcolumn('deletedAT')
  })
  
};
