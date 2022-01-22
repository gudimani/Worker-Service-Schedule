exports.seed = function (knex) {
  return knex("schedule")
    .del()
    .then(function () {
      return knex("schedule").insert([
        {
          date: "17-01-2022",
          shift: "Morning",
          worker_id: 1,
        },
        {
          date: "17-01-2022",
          shift: "Afternoon",
          worker_id: 2,
        },
        {
          date: "17-01-2022",
          shift: "Night",
          worker_id: 3,
        },
        {
          date: "18-01-2022",
          shift: "Morning",
          worker_id: 1,
        },
        {
          date: "18-01-2022",
          shift: "Afternoon",
          worker_id: 2,
        },
        {
          date: "18-01-2022",
          shift: "Night",
          worker_id: 3,
        },
        {
          date: "19-01-2022",
          shift: "Morning",
          worker_id: 1,
        },
        {
          date: "19-01-2022",
          shift: "Afternoon",
          worker_id: 2,
        },
        {
          date: "19-01-2022",
          shift: "Night",
          worker_id: 3,
        },
        {
          date: "20-01-2022",
          shift: "Morning",
          worker_id: 1,
        },
        {
          date: "20-01-2022",
          shift: "Afternoon",
          worker_id: 2,
        },
        {
          date: "20-01-2022",
          shift: "Night",
          worker_id: 3,
        },
        {
          date: "21-01-2022",
          shift: "Morning",
          worker_id: 1,
        },
        {
          date: "21-01-2022",
          shift: "Afternoon",
          worker_id: 2,
        },
        {
          date: "21-01-2022",
          shift: "Night",
          worker_id: 3,
        },
      ]);
    });
};
