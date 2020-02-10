'use strict';

const { Group } = use('App/Models');
const CreateGroupAthleteMatrixService = use(
  'App/Services/CreateGroupAthleteMatrixService'
);

class GroupController {
  async index({ params }) {
    const groups = await Group.query()
      .where({
        championship_id: params.championships_id
      })
      .fetch();

    return groups;
  }

  async store({ params }) {
    const { championships_id } = params;

    const groupsMatrix = await CreateGroupAthleteMatrixService.run({
      championship_id: championships_id
    });

    const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

    const result = groupsMatrix.map(async (gp, index) => {
      const group = await Group.create({
        letter: alphabet[index],
        championship_id: championships_id
      });

      await group.athletes().sync(gp);

      return group;
    });

    const groups = await Promise.all(result);

    return groups;
  }

  async show({ params }) {
    return Group.query()
      .where({ id: params.id })
      .with('championship')
      .with('athletes')
      .with('confronts')
      .fetch();
  }
}

module.exports = GroupController;
