
exports.up = function(knex, Promise) {
    return knex.schema.creattable('categories',table => {
        table.increments('id').primary()
        table.string('name').notnull()
        table.integer('parentid').references('id')
        .intable('categories')
    })
  
};

exports.down = function(knex, Promise) {
  return knex.schema.droptable('categories')
};
