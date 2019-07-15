/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema');
const address = require('../data/address');

class AddressSchema extends Schema {
  up() {
    this.create('addresses', (table) => {
      table.increments();
      table.string('street');
      table
        .integer('number')
        .notNullable()
        .unsigned();
      table.string('neighborhood');
      table.string('cep');
      table.string('complement');
      table.string('city').notNullable();
      table.enu('uf', address.ufs).notNullable();
      table.timestamps();
    });
  }

  down() {
    this.drop('addresses');
  }
}

module.exports = AddressSchema;
