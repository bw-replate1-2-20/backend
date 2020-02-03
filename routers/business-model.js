const db = require('../data/db-config.js');

module.exports = {
  add,
  find,
  findBy,
  findById
}

function find() {
  return db('business');
}

function findBy(filter) {
  return db('business').where(filter);
}

function findById(id) {
  return db('business')
    .where({id})
    .first();
}

async function add(volunteer) {
  const [id] = await db('business').insert(volunteer);
  return findById(id);
}
