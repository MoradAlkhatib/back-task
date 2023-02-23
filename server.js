const express = require('express');
const { Pool } = require('pg');
const cors = require('cors');

const app = express();
app.use(cors());
const port = 3000;

const pool = new Pool({
    host: "localhost",
    user: "morad",
    port: 5432,
    password: "6235",
    database: "postgres"
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Endpoint for create table.
app.post('/create-table', async (req, res) => {
  try {
    const query = {
      text: 'CREATE TABLE sectors (id SERIAL PRIMARY KEY, name VARCHAR(255), sectors_col VARCHAR(255), agreed BOOLEAN)',
    };
    await pool.query(query);
    res.status(200).send('Table created successfully');
  } catch (err) {
    console.error(err);
    res.status(500).send('Error creating table');
  }
});


// Endpoint for adding sectors to the database
app.post('/sectors', async (req, res) => {
  const { name, sectors_col, agreed } = req.body;

  try {
    const query = {
      text: 'INSERT INTO sectors (name, sectors_col,agreed) VALUES ($1, $2,$3) RETURNING id',
      values: [name, sectors_col],
    };
    const result = await pool.query(query);
    const id = result.rows[0].id;
    res.status(200).send({ id, name, sectors_col, agreed, message: 'Sectors added to the database' });
  } catch (err) {
    console.error(err);
    res.status(500).send('Error adding sectors to the database');
  }
});

// Endpoint for retrieving sectors from the database
app.get('/sectors/:id?', async (req, res) => {
  const id = req.params.id;

  try {
    if (id) {
      const query = {
        text: 'SELECT name, sectors_col, agreed FROM sectors WHERE id = $1',
        values: [id],
      };
      const result = await pool.query(query);
      const sector = result.rows[0];
      res.status(200).send(sector);
    } else {
      const result = await pool.query('SELECT id, name, sectors_col, agreed FROM sectors');
      const sectors = result.rows;
      res.status(200).send({ sectors });
    }
  } catch (err) {
    console.error(err);
    res.status(500).send('Error retrieving sectors from the database');
  }
});

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});
