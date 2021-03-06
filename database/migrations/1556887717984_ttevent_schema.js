/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema');

class TTEventSchema extends Schema {
  up() {
    this.create('ttevents', (table) => {
      table.increments();
      table
        .enu('type', ['school', 'state', 'intrastate', 'national', 'club'])
        .notNullable();
      table.string('name').notNullable();
      table.datetime('startInscription').notNullable();
      table.datetime('endInscription').notNullable();
      table.datetime('start').notNullable();
      table.datetime('end').notNullable();
      table
        .integer('federation_id')
        .notNullable()
        .unsigned()
        .references('federations.id');
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
