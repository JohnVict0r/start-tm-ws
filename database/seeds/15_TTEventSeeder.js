'use strict';

/*
|--------------------------------------------------------------------------
| EventSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory');

const { addressPath, tteventPath, entryPath } = use('App/Utils/ModelsPath');
const { Federation } = use('App/Models');

class EventSeeder {
  async run() {
    const federations_id = await Federation.ids();
    const address = await Factory.model(addressPath).create();
    const entryTypes = ['R', 'K', 'RK', 'KK', 'KKR'];

    const ttevent = await Factory.model(tteventPath).create({
      federations_id,
      address_id: address.id
    });

    const promisses = entryTypes.map(async (type) => {
      const entry = await Factory.model(entryPath).make({
        tt_event_id: ttevent.id,
        type
      });

      return entry.toJSON();
    });

    const entries = await Promise.all(promisses);

    await ttevent.entries().createMany(entries);
  }
}

module.exports = EventSeeder;
