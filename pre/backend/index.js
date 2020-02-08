const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');
const session = require('express-session');
const pascal = require('./pascal.js');
const store = require('./store.js');

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
  credentials: true // enable set cookie
}));

app.get('/questions', (req, res) => {
  res.send([
    {
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
    },
  ]);
});

app.post('/address', (req, res) => {
  req.session.address = req.body.address;

  res.send({ flood: pascal.isFlood(req.body.address) });
});

app.post('/answers', (req, res) => {
  store.add({ answers: req.body.answers, address: req.session.address });
  res.send({ message: 'merci' });
});

app.get('/admin', async (req, res) => {
  const data = await store.fetchAll();
  res.send(data);
});

app.listen(8081);
