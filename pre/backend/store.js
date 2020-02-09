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
        before: true,
        text: 'Combien de personnes résident chez vous?',
      },{
        id: 2,
        before: true,
        text: 'Avez-vous des animaux?',
      },{
        id: 3,
        before: true,
        text: 'Si vous avez répondus oui à la question précédente, combien et avez-vous des cages et/ou muselière?',
      },{
        id: 4,
        before: true,
        text: "Est-ce qu\'il y à des gens avec une santé à risque? Si oui, expliquez",
      },{
      },{
        id: 5,
        text: "Quelle est la hauteur de l'eau? Indiqué l'unité de mesure utilisé",
      },{
        id: 6,
        
        text: 'Combien de poche de sables vous croyez avoir de besoin?',
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
