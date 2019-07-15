/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema');

const group = require('../data/group');

class GroupSchema extends Schema {
  up() {
    this.create('groups', (table) => {
      table.increments();
      table.enu('letter', group.letters).notNullable();
      table
        .integer('championship_id')
        .notNullable()
        .unsigned()
        .references('championships.id')
        .onUpdate('cascade')
        .onDelete('cascade');
      table.timestamps();
      table.unique(['championship_id', 'letter']);
    });
  }

  down() {
    this.drop('groups');
  }
}

module.exports = GroupSchema;
