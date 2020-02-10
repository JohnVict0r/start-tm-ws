'use strict';

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema');

class ConfrontSchema extends Schema {
  up() {
    this.create('confronts', (table) => {
      table.increments();
      table
        .integer('number')
        .notNullable()
        .unsigned();
      table.string('arbiter_name');
      table
        .integer('athlete_one_id')
        .notNullable()
        .unsigned()
        .references('athletes.id')
        .onUpdate('cascade');
      table
        .integer('athlete_two_id')
        .notNullable()
        .unsigned()
        .references('athletes.id')
        .onUpdate('cascade');
      table
        .boolean('finalized')
        .notNullable()
        .defaultTo(false);
      table
        .enu('phase', ['classificatory', 'eliminatory'])
        .defaultTo('classificatory');
      table.integer('group_id').references('groups.id');
      table.integer('table_id').references('tables.id');
      table
        .integer('championship_id')
        .notNullable()
        .unsigned()
        .references('championships.id')
        .onUpdate('cascade')
        .onDelete('cascade');
      table.timestamps();
    });
  }

  down() {
    this.drop('confronts');
  }
}

module.exports = ConfrontSchema;
