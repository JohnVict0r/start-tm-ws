'use strict';

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model');

class Set extends Model {
  static columns() {
    return ['athlete_one_score', 'athlete_two_score', 'order', 'confront_id'];
  }
}

module.exports = Set;
