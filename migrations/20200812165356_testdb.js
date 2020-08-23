exports.up = function(knex) {
    return knex.schema.createTable('test', (table) => {
        table.increments();

        table.string('name');
        table.string('email');
        table.string('msg');
    })
  
};

exports.down = function(knex) {
    return knex.schema.dropTable('test')
};