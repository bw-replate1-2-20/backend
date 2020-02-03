const db = require('../data/db-config.js');

module.exports = {
  add,
//  remove, // TODO
  find,
  findBy,
  findById
}

function find() {
  return db('request');
}

function findBy(filter) {
  return db('request').where(filter);
}

function findById(id) {
  return db('request')
    .where({id})
    .first();
}

async function add(request) {
  const [id] = await db('request').insert(request);
  return findById(id);
}

// async function remove(request) {
//   const [id] = await db('request').delete(request);
//   return findById(id);
// }