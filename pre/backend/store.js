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
  async fetchAllDots() {
    let elements = [];

    const lats = Object.keys(data);
    lats.forEach((lat) => {
      const latValue = data[lat];
      const lngs = Object.keys(latValue);

      lngs.forEach((lng) => {
        elements.push({
          lng: lng,
          lat: lat,
        });
      });
    });

    return elements;
  },

  async add({ lng, lat, answer }) {
    data[lat] = data[lat] || {};
    data[lat][lng] = data[lat][lng] || [];
    data[lat][lng].push(answer);
  },

  async getAnswers({ lng, lat }) {
    if (!data[lat]) return [];

    const answers = data[lat][lng] || [];

    return answers;
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

seed.forEach((item) => {
  store.add({ lat: item.address.lat, lng: item.address.lng, answer: item.answers });
});

module.exports = store;
