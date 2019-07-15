/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema');
const address = require('../data/address');

class FederationSchema extends Schema {
  up() {
    this.create('federations', (table) => {
      table.increments();
      table.enu('uf', address.ufs).notNullable();
      table
        .string('name')
        .notNullable()
        .unique();
      table.string('initials').notNullable();
      table.timestamps();
    });
  }

  down() {
    this.drop('federations');
  }
}

module.exports = FederationSchema;
