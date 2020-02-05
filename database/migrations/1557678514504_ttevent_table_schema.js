/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema');

class TableSchema extends Schema {
  up() {
    this.create('tables', (table) => {
      table.increments();
      table.enu('status', ['FREE', 'BUSY', 'BROKEN']).defaultTo('FREE');
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
