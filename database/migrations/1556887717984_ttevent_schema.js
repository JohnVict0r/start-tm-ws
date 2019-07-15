/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema');
const event = require('../data/ttevent');

class TTEventSchema extends Schema {
  up() {
    this.create('ttevents', (table) => {
      table.increments();
      table.enu('type', event.types).notNullable();
      table.string('name').notNullable();
      table.datetime('start').notNullable();
      table.datetime('end').notNullable();
      table
        .integer('owner_id')
        .unsigned()
        .notNullable()
        .references('users.id')
        .onUpdate('CASCADE')
        .onDelete('CASCADE');
      table
        .integer('address_id')
        .notNullable()
        .unique()
        .unsigned()
        .references('addresses.id')
        .onUpdate('CASCADE')
        .onDelete('CASCADE');
      table.timestamps();
    });
  }

  down() {
    this.drop('ttevents');
  }
}

module.exports = TTEventSchema;
