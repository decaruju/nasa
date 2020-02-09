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

    async floodability({ latitude, longitude }) {
      const points = await allPoints();
      const distances = points.map((point) => getDistanceFromLatLonInKm(latitude, longitude, point[1], point[0]));
      return Math.min(...distances);
  },

  async region(name) {
    const data = await store.getMap();

    return Object.values(data["features"])
      .filter((e) => e['properties']['mrs_nm_mrc'] && e['properties']['mrs_nm_mrc'].toLocaleLowerCase() == name.toLocaleLowerCase())
      .map((e) => {
        return e['geometry']['coordinates'].map((e) => {
             return e[0].map((geo) => {
                return { lng: geo[0], lat: geo[1] };
             });
        });
      })[0];
  }
};

let pointsCache = [];
async function allPoints() {
    const map = await store.getMap();
    if (pointsCache.length) return pointsCache;
    map.features.forEach((feature) => feature.geometry.coordinates.forEach((zone) => zone.forEach((polygon) => polygon.forEach((point) => pointsCache.push(point)))));
    return pointsCache;
}


function getDistanceFromLatLonInKm(lat1, lon1, lat2, lon2) {
    const R = 6371; // Radius of the earth in km
    const dLat = deg2rad(lat2-lat1);  // deg2rad below
    const dLon = deg2rad(lon2-lon1);
    const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
        Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
        Math.sin(dLon/2) * Math.sin(dLon/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    const d = R * c; // Distance in km
    return d;
}

function deg2rad(deg) {
    return deg * (Math.PI/180);
}
