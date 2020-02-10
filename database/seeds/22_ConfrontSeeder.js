'use strict';

/*
|--------------------------------------------------------------------------
| ConfrontSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory');
const CreateClassificatoryConfrontsService = use(
  'App/Services/CreateClassificatoryConfrontsService'
);
const { Confront, Championship } = use('App/Models');
const { confrontPath } = use('App/Utils/ModelsPath');

class ConfrontSeeder {
  async run() {
    const championships_id = await Championship.ids();
    const result = championships_id.map(async (championship_id) => {
      const confronts = await CreateClassificatoryConfrontsService.run({
        championship_id
      });

      const confPromisses = confronts.map(async (conf) =>
        Factory.model(confrontPath).create(conf)
      );

      return Promise.all(confPromisses);
    });
    await Promise.all(result);
    return result;
  }
}

module.exports = ConfrontSeeder;
