const inside = require('point-in-geopolygon');
const store = require('./store');

module.exports = {
  async isFlood({ latitude, longitude }) {    
    const map = await store.getMap();
    return inside.feature(map, [longitude, latitude]);
  }
};
