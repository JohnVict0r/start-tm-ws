'use strict';

/*
|--------------------------------------------------------------------------
| GroupSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory');
const { Championship, Group } = use('App/Models');
const CreateGroupAthleteMatrixService = use(
  'App/Services/CreateGroupAthleteMatrixService'
);

class GroupSeeder {
  async run() {
    const championships_id = await Championship.ids();

    const result = championships_id.map(async (championship_id) => {
      const groupsMatrix = await CreateGroupAthleteMatrixService.run({
        championship_id
      });
      const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
      const groupsResult = groupsMatrix.map(async (gp, index) => {
        const group = await Group.create({
          letter: alphabet[index],
          championship_id
        });
        await group.athletes().sync(gp);
        return group;
      });
      await Promise.all(groupsResult);
    });
    await Promise.all(result);
  }
}

module.exports = GroupSeeder;
