const inside = require('point-in-geopolygon');
const store = require('./store');


module.exports = {
  async addressInRisk({ latitude, longitude }) {    
    const map = await store.getMap();

    return inside.feature(map, [longitude, latitude]);
  },
  
  all() {
    return store.getMap();
  },
  async region(name) {
    const data = await store.getMap();
    
    return Object.values(data["features"]).filter((e) => e['properties']['mrs_nm_mrc'] && e['properties']['mrs_nm_mrc'].toLocaleLowerCase() == name.toLocaleLowerCase());
  }
};
