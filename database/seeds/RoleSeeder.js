'use strict';

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory');

class RoleSeeder {
  async run() {
    const admRole = await Factory.model('Role').create({ name: 'Administrator', slug: 'adm' });
    const guestRole = await Factory.model('Role').create({ name: 'Guest', slug: 'gst' });
    const athlRole = await Factory.model('Role').create({ name: 'Athlete', slug: 'ath' });
    const fedRole = await Factory.model('Role').create({ name: 'Federation', slug: 'fed' });
    const clubRole = await Factory.model('Role').create({ name: 'Club', slug: 'clu' });
  }
}

module.exports = RoleSeeder;
