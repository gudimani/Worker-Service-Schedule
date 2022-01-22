const appenv = process.env.NODE_ENV || "development";
const config = require("../knexfile")[appenv];

module.exports = require("knex")(config);
