const seed = require('./seed.js');
// const r = require('rethinkdb');

// let conn = null;
// r.connect({ host: 'localhost', port: 28015 }, (err, connection) => {
//   if (err) throw err;
//   conn = connection;
//   conn.use('dev')
// });

const data = {};
const map = require('./geo.json');

const store = {
  async fetchAll() {
    const latitudeValues = Object.values(data)
    return latitudeValues.map((latitudeValue) => {
      return Object.values(latitudeValue).slice(-1).pop();
    }).flat();
  },

  async add(item) {
    const latitude = item.address.latitude;
    const longitude = item.address.longitude;

    data[latitude] = data[latitude] || {};
    data[latitude][longitude] = data[latitude][longitude] || [];
    data[latitude][longitude].push(item);
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

seed.forEach((item, index) => {
  store.add(item);
});

module.exports = store;
