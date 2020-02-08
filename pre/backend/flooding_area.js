const inside = require('point-in-geopolygon');
const store = require('./store');

// store.getMap().then((map) => {
//   console.log('map::', Object.values(map["features"]).map((e) => e['properties']['mrs_nm_mrc']));
// });

module.exports = {

  async addressInRisk({ latitude, longitude }) {    
    const map = await store.getMap();

    return inside.feature(map, [longitude, latitude]);
  },
  all() {
    return store.getMap();
  }
};
