'use strict';

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory');
const Hash = use('Hash');

const paths = use('App/Utils/ModelsPath');
const { addDays } = use('App/Utils/DateUtil');

const ufs = [
  'RN',
  'SP',
  'AM',
  'BA',
  'PE',
  'RO',
  'RR',
  'PR',
  'AL',
  'RJ',
  'MG',
  'MT',
  'MS',
  'AC',
  'PI',
  'SC',
  'SE',
  'TO',
  'RS',
  'PA',
  'PB',
  'MA',
  'GO',
  'ES',
  'DF',
  'CE',
  'AP'
];

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
  rating: data.rating,
  club_id: faker.pickone(data.clubs_id)
}));

Factory.blueprint(paths.personPath, async (faker, i, data) => ({
  name: faker.name(),
  sex: data.sex,
  birth: faker.date({
    string: true,
    year: data.year
  }),
  cpf: faker.cpf()
}));

Factory.blueprint(paths.clubPath, async (faker, i, data) => ({
  name: faker.name(),
  federation_id: faker.pickone(data.federations_id)
}));

Factory.blueprint(paths.federationPath, async (faker) => ({
  uf: faker.pickone(ufs),
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
  uf: faker.pickone(ufs)
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
    type: faker.pickone(['school', 'state', 'intrastate', 'national', 'club']),
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
  let downLimit = faker.integer({ min: 0, max: 3300 });
  let upperLimit = downLimit + 200;
  const { sex } = data;
  const type = data.types[i];
  let rankName = '';
  if (type === 'RAK') {
    downLimit = faker.integer({ min: 8, max: 100 });
    upperLimit = downLimit + 2;

    if (upperLimit <= 8) rankName = 'PRÉ-MIRIM';
    else if (upperLimit <= 10) rankName = 'MIRIM';
    else if (upperLimit <= 12) rankName = 'PETIZ';
    else if (upperLimit <= 15) rankName = 'INFANTIL';
    else if (upperLimit <= 18) rankName = 'JUVENIL';
    else if (upperLimit <= 21) rankName = 'JUVENTUDE';
    else rankName = 'ABSOLUTO';
  }

  return {
    tt_event_id: data.tt_event_id,
    name: `Campeonato ${type} ${rankName} ${sex}`,
    sex,
    type,
    upperLimit,
    downLimit
  };
});

Factory.blueprint(paths.tablePath, async (faker, i, data) => ({
  number: i + 1,
  tt_event_id: data.tt_event_id
}));

Factory.blueprint(paths.setPath, async (faker, i, data) => {
  const athlete_one_score = faker.integer({ min: 7, max: 15 });
  const athlete_two_score = faker.bool()
    ? athlete_one_score + 2
    : athlete_one_score - 2;

  return {
    order: i + 1,
    confront_id: data.confront_id,
    athlete_one_score,
    athlete_two_score
  };
});

Factory.blueprint(paths.confrontPath, async (faker, i, data) => ({
  ...data,
  finalized: true,
  arbiter_name: faker.name()
}));

Factory.blueprint(paths.entryPath, async (faker, i, data) => ({
  tt_event_id: data.tt_event_id,
  type: data.type,
  price: faker.integer({ min: 70, max: 200 })
}));
