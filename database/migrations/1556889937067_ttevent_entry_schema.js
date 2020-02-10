/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema');

class EntrySchema extends Schema {
  up() {
    this.create('entries', (table) => {
      table.increments();
      table
        .integer('tt_event_id')
        .notNullable()
        .unsigned()
        .references('ttevents.id');
      table.enu('type', ['R', 'K', 'RK', 'KK', 'KKR']).notNullable();
      table
        .double('price')
        .notNullable()
        .unsigned();
      table.timestamps();
      table.unique(['type', 'tt_event_id']);
    });
  }

  down() {
    this.drop('entries');
  }
}

module.exports = EntrySchema;
