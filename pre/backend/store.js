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

const initLoc = ({ lat, lng } = {}) => {
   data[lat] = data[lat] || {};
    data[lat][lng] = data[lat][lng] || {
      answers: [],
      requests: [],
    };
}

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
    initLoc({ lat, lng });
    data[lat][lng].answers.push(answer);
  },

  async addRequest({ lng, lat, request }) {
    initLoc({ lat, lng });
    data[lat][lng].requests.push(request);
  },

  async getAnswers({ lng, lat }) {
    if (!data[lat]) return [];

    const answers = data[lat][lng].answers || [];

    return answers;
  },

  async getQuestion() {
    return [
      {
        id: 1,
        before: true,
        text: 'Combien de personnes (enfants et adultes) résident chez vous?',
      },{
        id: 1,
        before: true,
        text: `S'il y a des enfants, combien et quelle ages ont ils?`,
      },{
        id: 4,
        before: true,
        text: "Est-ce qu\'il y à des gens avec une santé à risque? Si oui, expliquez",
      },{
        id: 2,
        before: true,
        text: 'Avez-vous des animaux?',
      },{
        id: 2,
        before: true,
        text: 'Disposez-vous de canots?',
      },{
        id: 2,
        before: true,
        text: "Disposez-vous de système de flotaison?",
      },{
        id: 3,
        before: true,
        text: 'Si vous avez répondus oui à la question précédente, combien et avez-vous des cages et/ou muselière?',
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
