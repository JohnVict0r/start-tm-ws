'use strict';

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema');
const Database = use('Database');
const Hash = use('Hash');
// const { User } = use('App/Models');

class CreateDefaultUserSchema extends Schema {
  async up() {
    const password = await Hash.make('secret');
    await Database.table('users').insert({
      username: 'Admin',
      email: 'admin@example.org',
      type: 'Admin',
      password,
      created_at: Date.now(),
      updated_at: Date.now()
    });

    // const user = await User.find(adminId);
    // await user.loadMany(['roles', 'permissions']);
    // user.roles().attach('Administrador');
  }

  async down() {
    Database.select('id')
      .from('users')
      .where('email', 'admin@example.org')
      .delete();
  }
}

module.exports = CreateDefaultUserSchema;
