# back end for task about sectors.

Add endpoints for adding and retrieving sectors to/from the database

This commit adds two endpoints to the Express app: a POST endpoint for adding sectors to the database, and a GET endpoint for retrieving sectors from the database. The endpoints use the `pg` module to interact with a PostgreSQL database. The code uses `async`/`await` syntax to handle asynchronous operations, and includes error handling to handle potential exceptions.

The POST endpoint accepts a JSON payload with a `name` and `sectors_col` field. It inserts the data into the `sectors` table and returns the newly generated `id`, along with the original `name` and `sectors_col` fields in the response body.

The GET endpoint accepts an optional `id` parameter, and returns either a single sector with the given `id`, or all sectors in the table if no `id` is provided. The response body includes the `id`, `name`, and `sectors_col` fields.

The code is ready for deployment to a production environment.
