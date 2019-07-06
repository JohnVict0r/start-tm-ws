/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema');
const ufs = require('../data/address/ufs');

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
      table.enu('uf', ufs).notNullable();
      table.timestamps();
    });
  }

  down() {
    this.drop('addresses');
  }
}

module.exports = AddressSchema;
