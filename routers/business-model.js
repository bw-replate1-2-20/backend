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

async function update(id, businessData) {
  console.log({id});
  console.log(businessData);
  return await db('business')
    .where({id})
    .first()
    .update(businessData);
}

async function remove(id) {
  return await db('business')
    .where({id})
    .del();
}