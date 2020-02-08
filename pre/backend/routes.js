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
    store.add({ answers: req.body.answers, address: req.session.address });
    res.send({ message: 'merci' });
  });

  app.get('/admin', async (req, res) => {
    const data = await store.fetchAll();
    res.send(data);
  });
};
