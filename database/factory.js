'use strict';

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory');
const Hash = use('Hash');

const { base } = use('App/Utils/ModelsPath');
const address = require('../database/data/address');

Factory.blueprint(`${base}/User`, async (faker, i, data) => ({
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

Factory.blueprint(`${base}/Athlete`, async (faker, i, data) => ({
  rating: faker.integer({ min: 0, max: 4000 }),
  club_id: faker.pickone(data.clubs_id)
}));

Factory.blueprint(`${base}/Person`, async (faker) => ({
  name: faker.name(),
  sex: faker.gender().toUpperCase(),
  birth: faker.date({
    string: true,
    year: `${faker.integer({ min: 1930, max: 2012 })}`
  }),
  cpf: faker.cpf()
}));

Factory.blueprint(`${base}/Club`, async (faker, i, data) => ({
  name: faker.name(),
  federation_id: faker.pickone(data.federations_id)
}));

Factory.blueprint(`${base}/Federation`, async (faker) => ({
  uf: faker.pickone(address.ufs),
  name: faker.company(),
  initials: faker.name()
}));

Factory.blueprint(`${base}/Address`, async (faker) => ({
  street: faker.street(),
  number: faker.integer({ min: 0, max: 9999 }),
  neighborhood: faker.province({ full: true }),
  cep: faker.zip(),
  complement: '',
  city: faker.city(),
  uf: faker.pickone(address.ufs)
}));
