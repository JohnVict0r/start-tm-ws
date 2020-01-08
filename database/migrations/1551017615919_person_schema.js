/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema');

class PersonSchema extends Schema {
  up() {
    this.create('people', (table) => {
      table.increments();
      table
        .integer('address_id')
        .unsigned()
        .references('addresses.id')
        .notNullable()
        .onUpdate('CASCADE')
        .onDelete('CASCADE');
      table.string('name').notNullable();
      table.enu('sex', ['MALE', 'FEMALE']).notNullable();
      table.date('birth').notNullable();
      table
        .string('cpf', 11)
        .notNullable()
        .unique();
      table
        .string('rg')
        .notNullable()
        .unique();
      table.timestamps();
    });
  }

  down() {
    this.drop('people');
  }
}

module.exports = PersonSchema;
