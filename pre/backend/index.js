const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');
const session = require('express-session');
const pascal = require('./pascal.js');

const r = require('rethinkdb');

const app = express();
app.use(morgan('combined'));
app.use(bodyParser.json());

app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false },
}));

app.use(cors({
    origin:['http://localhost:8080'],
    methods:['GET','POST'],
    credentials: true // enable set cookie
}));

// let conn = null;
// r.connect({ host: 'localhost', port: 28015 }, (err, connection) => {
//   if (err) throw err;
//   conn = connection;
//   conn.use('dev')
// });

const data = {};

app.get('/questions', (req, res) => {
  res.send([{
    id: 1,
    text: 'premiere question',
  },{
    id: 2,
    text: 'deuxieme question',
  },{
    id: 3,
    text: 'troisieme question',
  },{
    id: 4,
    text: 'quatrieme question',
  },{
    id: 5,
    text: 'cinquieme question',
  }, ]);
});

app.post('/address', (req, res) => {
  req.session.address = req.body.address;

  res.send({ flood: pascal.isFlood(req.body.address) });
});

app.post('/answers', (req, res) => {
  res.send({ message: 'merci' });
});

app.listen(8081);
