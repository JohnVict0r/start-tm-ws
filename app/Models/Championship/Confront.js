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
      'player_one',
      'player_two',
      'arbiter_name',
      'phase',
      'table_id',
      'finalized',
      'championship_id',
      'group_id'
    ];
  }

  playerOne() {
    return this.belongsTo('App/Models/Athlete', 'player_one', 'id');
  }

  playerTwo() {
    return this.belongsTo('App/Models/Athlete', 'player_two', 'id');
  }

  sets() {
    return this.hasMany('App/Models/TTEvent/Championship/Set');
  }

  table() {
    return this.belongsTo('App/Models/TTEvent/Table');
  }
}

module.exports = Confront;
