require('dotenv').config('pg');


const express = require('express');
const { Pool } = require('pg');
require('dotenv').config();

const app = express();
const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASS,
  port: process.env.DB_PORT
});

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: false }));
app.use(express.static('public')); // Bootstrap과 같은 정적 파일 제공

app.get('/', (req, res) => {
  res.redirect('/admin_users');
});

app.get('/admin_users', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM admin_user');
    res.render('admin_users', { users: result.rows });
  } catch (err) {
    res.send('Error ' + err.message);
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
