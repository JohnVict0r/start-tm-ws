'use strict';

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory');
const permissionData = require('../data/permission');

class PermissionSeeder {
  async run() {
    // User Permissions
    let result = permissionData.users.map(async (perm) => {
      await Factory.model('Permissions').create({
        name: perm.replace('_', ' ').toUpperCase(),
        slug: perm
      });
    });
    await Promise.all(result);

    result = permissionData.people.map(async (perm) => {
      await Factory.model('Permissions').create({
        name: perm.replace('_', ' ').toUpperCase(),
        slug: perm
      });
    });
    await Promise.all(result);

    result = permissionData.athletes.map(async (perm) => {
      await Factory.model('Permissions').create({
        name: perm.replace('_', ' ').toUpperCase(),
        slug: perm
      });
    });
    await Promise.all(result);

    result = permissionData.championships.map(async (perm) => {
      await Factory.model('Permissions').create({
        name: perm.replace('_', ' ').toUpperCase(),
        slug: perm
      });
    });
    await Promise.all(result);

    result = permissionData.clubs.map(async (perm) => {
      await Factory.model('Permissions').create({
        name: perm.replace('_', ' ').toUpperCase(),
        slug: perm
      });
    });
    await Promise.all(result);

    result = permissionData.federations.map(async (perm) => {
      await Factory.model('Permissions').create({
        name: perm.replace('_', ' ').toUpperCase(),
        slug: perm
      });
    });
    await Promise.all(result);
  }
}

module.exports = PermissionSeeder;
