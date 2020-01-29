'use strict';

/*
|--------------------------------------------------------------------------
| FederationSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory');

const { base } = use('App/Utils/ModelsPath');

class FederationSeeder {
  async run() {
    const federations = await Factory.model(`${base}/Federation`).createMany(3);
  }
}

module.exports = FederationSeeder;
