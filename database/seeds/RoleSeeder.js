'use strict';

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory');
const Database = use('Database');

const roles = require('../data/role');

class RoleSeeder {
  async run() {
    let result = null;
    // Roles
    const admRole = await Factory.model('Adonis/Acl/Role').create(roles.adm);
    const guestRole = await Factory.model('Adonis/Acl/Role').create(roles.gst);
    const clubRole = await Factory.model('Adonis/Acl/Role').create(roles.club);
    const fedRole = await Factory.model('Adonis/Acl/Role').create(roles.fed);

    // With Permissions
    result = await Database.select('id').from('permissions');
    const allPerm = result.map(row => row.id);

    result = await Database.select('id')
      .from('permissions')
      .where('slug', 'like', 'view_%');
    const readPerm = result.map(row => row.id);

    result = await Database.select('id')
      .from('permissions')
      .where('slug', 'like', '%_athletes');
    const athletePerm = result.map(row => row.id);

    result = await Database.select('id')
      .from('permissions')
      .where('slug', 'like', '%_clubs');
    const clubPerm = result.map(row => row.id);

    await admRole.permissions().attach(allPerm);
    await guestRole.permissions().attach(readPerm);
    await clubRole.permissions().attach([...readPerm, ...athletePerm]);
    await fedRole.permissions().attach([...readPerm, ...clubPerm]);
  }
}

module.exports = RoleSeeder;
