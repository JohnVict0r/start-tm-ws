'use strict';

/*
|--------------------------------------------------------------------------
| SetSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory');
const { Confront } = use('App/Models');
const { setPath } = use('App/Utils/ModelsPath');
class SetSeeder {
  async run() {
    const confronts_id = await Confront.ids();
    const promises = confronts_id.map(async (confront_id) => {
      await Factory.model(setPath).createMany(3, { confront_id });
    });
    await Promise.all(promises);
  }
}

module.exports = SetSeeder;
