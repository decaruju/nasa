const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');

const r = require('rethinkdb');

const app = express();
app.use(morgan('combined'));
app.use(bodyParser.json());
app.use(cors());

let conn = null;
r.connect({ host: 'localhost', port: 28015 }, (err, connection) => {
  if (err) throw err;
  conn = connection;
  conn.use('dev')
});

app.get('/questions', async(req, res) => {
  const cursor = await r.table('questions').run(conn);
  res.send(await cursor.toArray());
});

app.listen(8081)
