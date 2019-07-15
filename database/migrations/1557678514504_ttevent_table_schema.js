/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema');

const tables = require('../data/table');

class TableSchema extends Schema {
  up() {
    this.create('tables', (table) => {
      table.increments();
      table.enu('status', tables.status).defaultTo(tables.status[0]);
      table
        .integer('number')
        .notNullable()
        .unsigned();
      table
        .integer('tt_event_id')
        .notNullable()
        .unsigned()
        .references('ttevents.id')
        .onUpdate('cascade')
        .onDelete('cascade');
      table.timestamps();
      table.unique(['tt_event_id', 'number']);
    });
  }

  down() {
    this.drop('tables');
  }
}

module.exports = TableSchema;
