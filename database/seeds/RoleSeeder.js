'use strict';

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory');
const Database = use('Database');

class RoleSeeder {
  async run() {
    // Roles
    const admRole = await Factory.model('Role').create({ name: 'Administrator', slug: 'adm' });
    const guestRole = await Factory.model('Role').create({ name: 'Guest', slug: 'gst' });
    const clubRole = await Factory.model('Role').create({ name: 'Club President', slug: 'clu' });
    const fedRole = await Factory.model('Role').create({
      name: 'Federation President',
      slug: 'fed'
    });

    // With Permissions
    const allPerm = await Database.select('id').from('permissions');
    const readPerm = await Database.select('id')
      .from('permissions')
      .where('slug', 'like', 'view_%');
    const athletePerm = await Database.select('id')
      .from('permissions')
      .where('slug', 'like', '%_athletes');
    const clubPerm = await Database.select('id')
      .from('permissions')
      .where('slug', 'like', '%_clubs');

    await admRole.permissions().attach(allPerm);
    await guestRole.permissions().attach(readPerm);
    await clubRole.permissions().attach([...readPerm, ...athletePerm]);
    await fedRole.permissions().attach([...readPerm, ...clubPerm]);
  }
}

module.exports = RoleSeeder;
