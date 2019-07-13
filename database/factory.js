'use strict';

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory');
const Hash = use('Hash');
const { base } = use('App/Utils/ModelsPath');

Factory.blueprint(`${base}/User`, async (faker, i, data) => ({
  username: data.username,
  email: data.email ? data.email : faker.email({ domain: 'example.com' }),
  password: await Hash.make('psw12345')
}));

Factory.blueprint('Adonis/Acl/Role', async (faker, i, data) => ({
  name: data.name,
  slug: data.slug,
  description: 'Auto Generated Role'
}));

Factory.blueprint('Adonis/Acl/Permission', async (faker, i, data) => ({
  name: data.name,
  slug: data.slug,
  description: 'Auto Generated Permission'
}));
