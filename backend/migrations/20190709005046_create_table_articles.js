
exports.up = function(knex, Promise) {
  return knex.schema.createtable('articles',table => {
      table.increments('id').primary()
      table.string('name').notnull()
      table.string('description',1000).notnull()
      table.string('imageurl',1000)
      table.binary('content').notnull()
      table.integer('userid').references('id')
      .intable('users').notnull()
      table.integer('categoryid').references('id')
      .intable('categories').notnull()
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.droptable('article')
};
