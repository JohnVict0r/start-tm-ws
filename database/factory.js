'use strict';

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory');
const Hash = use('Hash');
const { base } = use('App/Utils/ModelsPath');

Factory.blueprint(`${base}/User`, async faker => ({
  username: faker.username(),
  email: faker.email({ domain: 'example.com' }),
  password: await Hash.make(faker.password())
}));

Factory.blueprint('Role', async (faker, i, data) => ({
  name: data.name,
  slug: data.slug,
  description: 'Auto Generated Role'
}));

Factory.blueprint('Permission', async (faker, i, data) => ({
  name: data.name,
  slug: data.slug,
  description: 'Auto Generated Permission'
}));
