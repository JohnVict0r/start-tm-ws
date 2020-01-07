/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema');

class AthleteSchema extends Schema {
  up() {
    this.create('athletes', (table) => {
      table.increments();
      table.integer('people_id').references('people.id');
      table
        .integer('rating')
        .unsigned()
        .notNullable();
      table
        .integer('club_id')
        .unsigned()
        .notNullable()
        .references('clubs.id');
      table.timestamps();
    });
  }

  down() {
    this.drop('athletes');
  }
}

module.exports = AthleteSchema;
