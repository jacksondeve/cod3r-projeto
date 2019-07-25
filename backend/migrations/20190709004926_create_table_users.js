
exports.up = function(knex, Promise) {
    return knex.schema.createtable('user', table => {
        table.increments('id').primary()
        table.string('name').nonull()
        table.string('email').nonull()
        table.string('password').nonull()
        table.boolean('admin').nonull().defaultTo((false))
    })
};

exports.down = function(knex, Promise) {
    return knex.schema.droptable('users')
  
};
