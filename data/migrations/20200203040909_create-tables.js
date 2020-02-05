
exports.up = function(knex) {
      // Start with the 1's: 1 recipe has many steps and ingrdients
      return knex.schema
      .createTable('Volunteer', tbl => {
        tbl.increments();
        tbl.string('email', 255).notNullable().unique();
        tbl.string('password', 255).notNullable();
        tbl.string('name', 255).notNullable();
        tbl.string('phone', 32).notNullable();
      })
      .createTable('Business', tbl => {
        tbl.increments();
        tbl.string('email', 255).notNullable().unique();
        tbl.string('password', 255).notNullable();
        tbl.string('name', 255).notNullable();
        tbl.string('address', 512).notNullable();
        tbl.string('description', 1024);
        tbl.string('phone', 32).notNullable();

      })
      .createTable('Request', tbl => {
        tbl.increments();
        tbl.string('title', 255).notNullable();
        tbl.string('description', 2048).notNullable();
        tbl.string('quantity', 512).notNullable();
        tbl.integer('ready_by').defaultTo(null);
        tbl.integer('picked_up').defaultTo(null);
        tbl.integer('delivered').defaultTo(null);
        tbl.integer('volunteer_id')
          .unsigned()
          .references('id')
          .inTable('Volunteer')
          .onDelete('RESTRICT')
          .onUpdate('CASCADE');
        tbl.integer('business_id')
          .unsigned()
          .notNullable()
          .references('id')
          .inTable('Business')
          .onDelete('RESTRICT') // What happens if this ID is deleted.
          .onUpdate('CASCADE'); // What happens if this ID changes.
      });                       // CASCADE, SET NULL, DO NOTHING, RESTRICT
};

exports.down = function(knex) {
  return knex.schema
  .dropTableIfExists('Request')
  .dropTableIfExists('Business')
  .dropTableIfExists('Volunteer')
};
