exports.up = function (knex) {
  return knex.schema.createTable("schedule", function (table) {
    table.timestamp("date");
    table.string("shift");
    table.integer("worker_id");
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("schedule");
};
