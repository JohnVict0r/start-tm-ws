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
  /**
   * Show a list of all groups.
   * GET groups
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index({ request, response, view }) {}

  /**
   * Create/save a new group.
   * POST groups
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store({ request, response, params }) {
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

  /**
   * Display a single group.
   * GET groups/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async show({ params, request, response }) {}

  /**
   * Update group details.
   * PUT or PATCH groups/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update({ params, request, response }) {}
}

module.exports = GroupController;
