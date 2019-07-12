'use strict';

const Factory = use('Factory');
const Database = use('Database');

const { base } = use('App/Utils/ModelsPath');

class UserSeeder {
  async run() {
    // Visitor
    const user = await Factory.model(`${base}/User`).create();
    const roles = await Database.table('roles').where({ slg: '' });

    user.roles().attach([]);
  }
}

module.exports = UserSeeder;
