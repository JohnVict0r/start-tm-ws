'use strict';

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model');

class GroupAthlete extends Model {
  static columns() {
    return ['athlete_id', 'group_id', 'classification'];
  }
}

module.exports = GroupAthlete;
