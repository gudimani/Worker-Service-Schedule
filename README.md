# Worker-Service-Schedule

## How to run the API

The data in the database can be setup using the knex. Please run the following commands to setup the database.

1. Setup a new database in postgres and update database NODE_ENV=test, name, port, password, host with newly created database in .env.
2. Tables and data can be created by running the following commands
   2.1 npx knex migrate:latest
   2.2 npx knex seed:run
3. Run npm run dev
4. For testing run npm run test

# API Endpoints

## GET /workers

Fetch all the workers list of the company

## GET /shifts/:id

Fetch the shift details of a worker with id

## GET /timesheet/:date

Fetch one week schedule from the date input given

## POST /schedule

Creates schedule for the workers

## PATCH /update/:id

Updates shift for a particular worker with id
