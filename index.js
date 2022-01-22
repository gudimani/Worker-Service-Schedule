const express = require("express");
const morgan = require("morgan");
const client = require("./connection");
const routes = require("./routes/workers");
require("dotenv").config();

const app = express();

app.use(morgan("combined"));
app.use(express.json());
app.use(routes);

client.connect();

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`listening on ${port}`));

module.exports = app;
