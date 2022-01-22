exports.up = function (knex) {
  return knex.schema.createTable("workers", function (table) {
    table.string("firstname");
    table.string("lastname");
    table.integer("id");
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("workers");
};
