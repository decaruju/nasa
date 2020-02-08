// const r = require('rethinkdb');

// let conn = null;
// r.connect({ host: 'localhost', port: 28015 }, (err, connection) => {
//   if (err) throw err;
//   conn = connection;
//   conn.use('dev')
// });

const data = {};

module.exports = {
  async fetchAll() {
    return Object.values(data);
  },

  async add(item) {
    const next = Object.keys(data).length;
    data[next] = item;
  }
};
