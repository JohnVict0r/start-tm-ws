'use strict';

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory');
const permissions = require('../data/permission');

class PermissionSeeder {
  async run() {
    let result = permissions.users.map(async (perm) => {
      await Factory.model('Adonis/Acl/Permission').create({
        name: perm.replace('_', ' ').toUpperCase(),
        slug: perm
      });
    });
    await Promise.all(result);

    result = permissions.people.map(async (perm) => {
      await Factory.model('Adonis/Acl/Permission').create({
        name: perm.replace('_', ' ').toUpperCase(),
        slug: perm
      });
    });
    await Promise.all(result);

    result = permissions.athletes.map(async (perm) => {
      await Factory.model('Adonis/Acl/Permission').create({
        name: perm.replace('_', ' ').toUpperCase(),
        slug: perm
      });
    });
    await Promise.all(result);

    result = permissions.championships.map(async (perm) => {
      await Factory.model('Adonis/Acl/Permission').create({
        name: perm.replace('_', ' ').toUpperCase(),
        slug: perm
      });
    });
    await Promise.all(result);

    result = permissions.clubs.map(async (perm) => {
      await Factory.model('Adonis/Acl/Permission').create({
        name: perm.replace('_', ' ').toUpperCase(),
        slug: perm
      });
    });
    await Promise.all(result);

    result = permissions.federations.map(async (perm) => {
      await Factory.model('Adonis/Acl/Permission').create({
        name: perm.replace('_', ' ').toUpperCase(),
        slug: perm
      });
    });
    await Promise.all(result);
  }
}

module.exports = PermissionSeeder;
