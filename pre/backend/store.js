// const r = require('rethinkdb');

// let conn = null;
// r.connect({ host: 'localhost', port: 28015 }, (err, connection) => {
//   if (err) throw err;
//   conn = connection;
//   conn.use('dev')
// });

const data = {};
const map = require('./geo.json');

module.exports = {
  async fetchAll() {
    return Object.values(data);
  },

  async add(item) {
    const next = Object.keys(data).length;
    data[next] = item;
  },

  async getQuestion() {
    return [
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
    ];
  },

  async getMap() {
    return map;
  },
};
