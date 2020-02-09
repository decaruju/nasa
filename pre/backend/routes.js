const floodingArea = require('./flooding_area.js');
const store = require('./store.js');

module.exports = (app) => {
  app.get('/questions', async (req, res) => {
    const questions = await store.getQuestion();
    res.send(questions);
  });

  app.post('/in_risk', async(req, res) => {
    req.session.address = req.body.address;

      const inRisk = await floodingArea.addressInRisk(req.body.address);
      const response = { inRisk };
      if (!inRisk) {
          response.floodability = await floodingArea.floodability(req.body.address);
      }

      res.send(response);
  });

  app.get('/flooding_risk/:region?', async(req, res) => {
    res.send({ maps: await floodingArea.region(req.params.region) });
  });


  app.post('/answers', (req, res) => {
    let address = req.session.address;
    
    if (req.body.lng) address.lng = req.body.lng;
    if (req.body.lat) address.lat = req.body.lat;

    store.add({ answer: req.body.answers, ...address });
    res.send({ message: 'merci' });
  });

  app.get('/answers', async (req, res) => {
    const answers = await store.getAnswers({
      lng: req.query.lng,
      lat: req.query.lat,
    });

    res.send(answers);
  });

  app.get('/admin', async (req, res) => {
    const data = await store.fetchAllDots();
    res.send(data);
  });
};
