'use strict';

const Schema = use('Schema');

const role = require('../data/role');

class RolesTableSchema extends Schema {
  up() {
    this.create('roles', (table) => {
      table.increments();
      table
        .enu('slug', Object.values(role.slugs))
        .notNullable()
        .unique();
      table
        .string('name')
        .notNullable()
        .unique();
      table.text('description').nullable();
      table.timestamps();
    });
  }

  down() {
    this.drop('roles');
  }
}

module.exports = RolesTableSchema;
