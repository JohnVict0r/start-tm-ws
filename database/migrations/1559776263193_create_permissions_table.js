'use strict';

const Schema = use('Schema');

const permission = require('../data/permission');

class PermissionsTableSchema extends Schema {
  up() {
    this.create('permissions', (table) => {
      table.increments();
      table
        .enu('slug', permission.slugs)
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
    this.drop('permissions');
  }
}

module.exports = PermissionsTableSchema;
