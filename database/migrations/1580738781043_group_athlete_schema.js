'use strict';

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema');

class GroupAthleteSchema extends Schema {
  up() {
    this.create('group_athletes', (table) => {
      table.increments();
      table
        .integer('athlete_id')
        .notNullable()
        .unsigned()
        .references('athletes.id');
      table
        .integer('group_id')
        .notNullable()
        .unsigned()
        .references('groups.id');
      table
        .integer('classification')
        .notNullable()
        .unsigned()
        .defaultTo(0);
      table.timestamps();
    });
  }

  down() {
    this.drop('group_athletes');
  }
}

module.exports = GroupAthleteSchema;
