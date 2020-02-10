/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema');

class FederationSchema extends Schema {
  up() {
    this.create('federations', (table) => {
      table.increments();
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
