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
const { Club, Championship } = use('App/Models');

class AthleteSeeder {
  async run() {
    const clubs_id = await Club.ids();

    const champRating = await Championship.query().where({ type: 'RAT' }).first();
    const champRaking = await Championship.query()
      .where({ type: 'RAK' })
      .orderBy('downLimit', 'asc')
      .first();

    const year = new Date().getFullYear() - champRaking.downLimit - 1;


    const people = await Factory.model(personPath).createMany(27, { year, sex: champRaking.sex });
    const athletes = await Factory.model(athletePath).makeMany(people.length, {
      clubs_id, rating: champRating.downLimit
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
