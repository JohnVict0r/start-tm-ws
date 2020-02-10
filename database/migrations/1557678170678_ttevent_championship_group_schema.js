/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema');

class GroupSchema extends Schema {
  up() {
    this.create('groups', (table) => {
      table.increments();
      table
        .enu('letter', [
          'A',
          'B',
          'C',
          'D',
          'E',
          'F',
          'G',
          'H',
          'I',
          'J',
          'K',
          'L',
          'M',
          'N',
          'O',
          'P',
          'Q',
          'R',
          'S',
          'T',
          'U',
          'V',
          'W',
          'X',
          'Y',
          'Z'
        ])
        .notNullable();
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
