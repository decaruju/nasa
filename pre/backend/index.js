const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');
const session = require('express-session');
const routes = require('./routes.js');

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

routes(app);

app.listen(8081);
