/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema');
class AddressSchema extends Schema {
  up() {
    this.create('addresses', (table) => {
      table.increments();
      table.string('street');
      table.integer('number').unsigned();
      table.string('neighborhood');
      table.string('cep');
      table.string('complement');
      table.string('city').notNullable();
      table
        .enu('uf', [
          'RN',
          'SP',
          'AM',
          'BA',
          'PE',
          'RO',
          'RR',
          'PR',
          'AL',
          'RJ',
          'MG',
          'MT',
          'MS',
          'AC',
          'PI',
          'SC',
          'SE',
          'TO',
          'RS',
          'PA',
          'PB',
          'MA',
          'GO',
          'ES',
          'DF',
          'CE',
          'AP'
        ])
        .notNullable();
      table.timestamps();
    });
  }

  down() {
    this.drop('addresses');
  }
}

module.exports = AddressSchema;
