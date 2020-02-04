const db = require('../data/db-config.js');

module.exports = {
  add,
  find,
  findBy,
  findById,
  update,
  remove
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

async function update(id, requestData) {
  return await db('request')
    .where({id})
    .update(requestData);
}

async function remove(id) { // TODO: Return item? Currently 0 or 1.
  return await db('request')
    .where({id})
    .del();
}