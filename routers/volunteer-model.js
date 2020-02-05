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
  return db('volunteer');
}

function findBy(filter) {
  return db('volunteer').where(filter);
}

function findById(id) {
  return db('volunteer')
    .where({id})
    .first();
}

async function add(volunteer) {
  const [id] = await db('volunteer').insert(volunteer);
  return findById(id);
}

async function update(id, volunteerData) {
  return await db('volunteer')
    .where({id})
    .update(volunteerData);
}

async function remove(id) { 
  return await db('volunteer')
    .where({id})
    .del();
}