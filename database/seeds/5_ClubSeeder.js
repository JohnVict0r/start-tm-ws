'use strict';

/*
|--------------------------------------------------------------------------
| ClubSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory');
const { Federation } = use('App/Models');
const { base } = use('App/Utils/ModelsPath');

class ClubSeeder {
  async run() {
    const federations_id = await Federation.ids();
    const addresses = await Factory.model(`${base}/Address`).createMany(5);
    const clubs = await Factory.model(`${base}/Club`).makeMany(5, {
      federations_id
    });

    const result = clubs.map(async (club, i) => {
      club.address_id = addresses[i].id;
      await club.save();
      return club;
    });
    await Promise.all(result);
  }
}

module.exports = ClubSeeder;
