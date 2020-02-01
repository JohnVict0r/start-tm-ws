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
const { base } = use('App/Utils/ModelsPath');
const { Athlete, Championship, Federation } = use('App/Models');

class TTEventSeeder {
  async run() {
    const federations_id = await Federation.ids();
    const address = await Factory.model(`${base}/Address`).create();

    const ttevent = await Factory.model(`${base}/TTEvent`).create({
      federations_id,
      address_id: address.id
    });
  }
}

module.exports = TTEventSeeder;
