exports.seed = function (knex) {
  return knex("workers")
    .del()
    .then(function () {
      return knex("workers").insert([
        {
          firstname: "Pavitra",
          lastname: "LG",
          id: 1,
        },
        {
          firstname: "John",
          lastname: "Milo",
          id: 2,
        },
        {
          firstname: "Michael",
          lastname: "Kors",
          id: 3,
        },
      ]);
    });
};
