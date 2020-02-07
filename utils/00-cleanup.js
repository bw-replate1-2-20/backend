
const cleaner = require('knex-cleaner');

exports.seed = async function(knex) {
  // Deletes ALL existing entries
  return await cleaner.clean(knex, { // TODO: Should this be in a promise?
    mode: 'truncate', // Reset IDs
    // Don't empty migration tables
    ignoreTables: ['knex_migrations', 'knex_migrations_lock'],
  });
};

