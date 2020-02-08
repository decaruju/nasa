const floodingArea = require('./flooding_area.js');
const store = require('./store.js');

module.exports = (app) => {
  app.get('/questions', async (req, res) => {
    const questions = await store.getQuestion();
    res.send(questions);
  });

  app.post('/address', async(req, res) => {
    req.session.address = req.body.address;

    res.send({ isFlooded: await floodingArea.addressInRisk(req.body.address) });
  });

  app.get('/flooding_risk', async(req, res) => {
    res.send({ maps: await floodingArea.all() });
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
