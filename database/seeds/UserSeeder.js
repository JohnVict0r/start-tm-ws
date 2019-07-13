'use strict';

const Factory = use('Factory');
const Database = use('Database');

const { base } = use('App/Utils/ModelsPath');
const role = require('../data/role');

class UserSeeder {
  async run() {
    let result = null;
    // Users
    const admUser = await Factory.model(`${base}/User`).create({ username: 'adminUser' });
    const guestUser = await Factory.model(`${base}/User`).create({ username: 'guestUser' });
    const clubUser = await Factory.model(`${base}/User`).create({ username: 'clubUser' });
    const fedUser = await Factory.model(`${base}/User`).create({ username: 'fedUser' });

    // With Roles
    result = await Database.select('id')
      .from('roles')
      .where({ slug: role.adm.slug });
    const admRole = result.map(row => row.id);

    result = await Database.select('id')
      .from('roles')
      .where({ slug: role.gst.slug });
    const guestRole = result.map(row => row.id);

    result = await Database.select('id')
      .from('roles')
      .where({ slug: role.club.slug });
    const clubRole = result.map(row => row.id);

    result = await Database.select('id')
      .from('roles')
      .where({ slug: role.fed.slug });
    const fedRole = result.map(row => row.id);

    await admUser.roles().attach(admRole);
    await guestUser.roles().attach(guestRole);
    await clubUser.roles().attach(clubRole);
    await fedUser.roles().attach(fedRole);
  }
}

module.exports = UserSeeder;
