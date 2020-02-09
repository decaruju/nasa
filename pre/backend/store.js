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

  async getRequests() {

    let requests = [];

    let req = await this.getPossibleRequests();
    req = req.reduce((acc, e) => {
      acc[e.id] = e;
      return acc;
    }, {});

    Object.keys(data).forEach((lat) => {
      Object.keys(data[lat]).forEach((lng) => {
        requests = [...requests, ...data[lat][lng].requests.map((obj) => { 
          ids = Object.keys(obj);
          return ids.reduce((acc, id) => { 
            acc.push({
              response: obj[id],
              question: req[id]
            });
            return acc;
           }, []);
        })];
      });
    });

    return requests;
  },

  async addRequest({ lng, lat, request }) {
    initLoc({ lat, lng });
    data[lat][lng].requests.push(request);
  },

  async getPossibleRequests() {
    return [
        {
          id: 1,
          text: 'Voulez-vous vous inscrire à la distribution de denrées?',
          type: 'radio',
          posibility: [
            {
              value: 1,
              text: 'Oui',
            },
            {
              value: 2,
              text: 'Non',
            },
          ]
        },
        {
          id: 2,
          text: `Inscrire les médicaments dont vous avez besoin.`,
          type: 'text',
        },
      ];
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
        text: `Inscrire le nombre total de personnes qui résident à cette adresse.`,
      },{
        id: 2,
        before: true,
          text: `Inscrire le nombre d'enfants qui résident à cette adresse.`,
      },{
        id: 3,
        before: true,
        text: `Inscrire les problèmes de santés des personnes qui résident à cette adresse.`,
      },{
        id: 4,
        before: true,
        text: 'Inscrire les animaux qui résident à cette adresse.',
      },{
        id: 5,
        before: true,
        text: `Disposez-vous d'une embarcation? Préciser.`,
      },{
        id: 6,
        before: true,
        text: "Disposez-vous de système de flotaison? Préciser.",
      },{
        id: 7,
        before: false,
        text: "Inscrire la hauteur de l'eau à votre adresse.",
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
