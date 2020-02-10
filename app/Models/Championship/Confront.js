'use strict';

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model');

class Confront extends Model {
  static boot() {
    super.boot();
  }

  static columns() {
    return [
      'number',
      'athlete_one_id',
      'athlete_two_id',
      'arbiter_name',
      'phase',
      'table_id',
      'finalized',
      'championship_id',
      'group_id'
    ];
  }

  athleteOne() {
    return this.belongsTo('App/Models/Athlete', 'athlete_one_id', 'id');
  }

  athleteTwo() {
    return this.belongsTo('App/Models/Athlete', 'athlete_two_id', 'id');
  }

  sets() {
    return this.hasMany('App/Models/Championship/Set');
  }

  table() {
    return this.belongsTo('App/Models/TTEvent/Table');
  }
}

module.exports = Confront;
