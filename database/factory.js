'use strict';

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory');
const Hash = use('Hash');

const paths = use('App/Utils/ModelsPath');
const address = require('../database/data/address');
const tteventData = require('../database/data/ttevent');
const { addDays } = require('../app/Utils/DateUtils');

Factory.blueprint(paths.userPath, async (faker, i, data) => ({
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

Factory.blueprint(paths.athletePath, async (faker, i, data) => ({
  rating: faker.integer({ min: 0, max: 4000 }),
  club_id: faker.pickone(data.clubs_id)
}));

Factory.blueprint(paths.personPath, async (faker) => ({
  name: faker.name(),
  sex: faker.gender().toUpperCase(),
  birth: faker.date({
    string: true,
    year: `${faker.integer({ min: 1930, max: 2012 })}`
  }),
  cpf: faker.cpf()
}));

Factory.blueprint(paths.clubPath, async (faker, i, data) => ({
  name: faker.name(),
  federation_id: faker.pickone(data.federations_id)
}));

Factory.blueprint(paths.federationPath, async (faker) => ({
  uf: faker.pickone(address.ufs),
  name: faker.company(),
  initials: faker.name()
}));

Factory.blueprint(paths.addressPath, async (faker) => ({
  street: faker.street(),
  number: faker.integer({ min: 0, max: 9999 }),
  neighborhood: faker.province({ full: true }),
  cep: faker.zip(),
  complement: '',
  city: faker.city(),
  uf: faker.pickone(address.ufs)
}));

Factory.blueprint(paths.athleteInscriptionPath, async (faker, i, data) => ({
  championship_id: faker.pickone(data.championships_id),
  approved: true
}));

Factory.blueprint(paths.tteventPath, async (faker, i, data) => {
  const startInscription = faker
    .date({ year: new Date().getFullYear() })
    .toDateString();
  const endInscription = addDays(
    startInscription,
    faker.integer({ min: 1, max: 15 })
  ).toDateString();
  const start = addDays(
    endInscription,
    faker.integer({ min: 1, max: 7 })
  ).toDateString();
  const end = addDays(start, faker.integer({ min: 1, max: 5 })).toDateString();

  return {
    type: faker.pickone(tteventData.types),
    name: `Evento ${faker.company()}`,
    startInscription,
    endInscription,
    start,
    end,
    federation_id: faker.pickone(data.federations_id),
    address_id: data.address_id
  };
});

Factory.blueprint(paths.championshipPath, async (faker, i, data) => {
  let upperLimit = faker.integer({ min: 0, max: 3499 });
  let downLimit = faker.integer({ min: upperLimit, max: 3500 });
  const sex = faker.pickone(['M', 'F', 'X']);
  const type = faker.pickone(['RAT', 'RAK']);

  if (type === 'RAK') {
    upperLimit = faker.integer({ min: 8, max: 69 });
    downLimit = faker.integer({ min: upperLimit, max: 70 });
  }

  return {
    tt_event_id: data.tt_event_id,
    name: `Campeonato ${sex} ${type}`,
    sex,
    type,
    upperLimit,
    downLimit
  };
});

Factory.blueprint(paths.tablePath, async (faker, i, data) => ({
  number: i,
  tt_event_id: data.tt_event_id
}));
