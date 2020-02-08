const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');
const session = require('express-session');

const r = require('rethinkdb');

const app = express();
app.use(morgan('combined'));
app.use(bodyParser.json());
app.use(cors());

app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: true }
}));

// let conn = null;
// r.connect({ host: 'localhost', port: 28015 }, (err, connection) => {
//   if (err) throw err;
//   conn = connection;
//   conn.use('dev')
// });

app.get('/questions', (req, res) => {
  res.send([{
    id: 1,
    text: 'premiere question'
  }]);
});

app.post('/address', (req, res) => {
  req.session.address = req.body.address;

  res.send({ flood: true });
});

app.listen(8081);
