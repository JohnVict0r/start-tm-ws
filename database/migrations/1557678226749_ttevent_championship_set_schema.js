/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema');

class SetSchema extends Schema {
  up() {
    this.create('sets', (table) => {
      table.increments();
      table
        .integer('order')
        .notNullable()
        .unsigned();
      table
        .integer('athlete_one_score')
        .notNullable()
        .unsigned();
      table
        .integer('athlete_two_score')
        .notNullable()
        .unsigned();
      table
        .integer('confront_id')
        .notNullable()
        .unsigned()
        .references('confronts.id')
        .onUpdate('cascade')
        .onDelete('cascade');
      table.unique(['order', 'confront_id']);
      table.timestamps();
    });
  }

  down() {
    this.drop('sets');
  }
}

module.exports = SetSchema;
