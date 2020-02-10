'use strict';

/*
|--------------------------------------------------------------------------
| AthleteSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory');
const { personPath, athletePath } = use('App/Utils/ModelsPath');
const { Club } = use('App/Models');

class AthleteSeeder {
  async run() {
    const clubs_id = await Club.ids();

    const people = await Factory.model(personPath).createMany(13);
    const athletes = await Factory.model(athletePath).makeMany(13, {
      clubs_id
    });

    const result = athletes.map(async (athl, index) => {
      athl.person_id = people[index].id;
      await athl.save();
      return athl;
    });

    await Promise.all(result);
  }
}

module.exports = AthleteSeeder;
