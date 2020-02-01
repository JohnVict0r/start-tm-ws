'use strict';

const { Group, Championship, Athlete } = use('App/Models');
const CreateGroupAthleteMatrixService = use(
  'App/Services/CreateGroupAthleteMatrixService'
);

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with groups
 */
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
      championships_id
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
      .fetch();
  }

  async update() {}
}

module.exports = GroupController;
