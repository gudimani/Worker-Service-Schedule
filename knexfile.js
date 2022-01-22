require("dotenv").config();

module.exports = {
  test: {
    client: "postgresql",
    connection: {
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      port: process.env.DB_PORT,
      password: process.env.DB_PASSWORD,
      database: "test_db",
    },
    migrations: {
      directory: "./models/migrations",
      tableName: "knex_migrations",
    },
    seeds: {
      directory: "./models/seeds",
    },
  },
};
