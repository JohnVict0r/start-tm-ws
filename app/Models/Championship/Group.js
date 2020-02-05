'use strict';

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model');
const { championshipPath, athletePath, groupAthletePath, confrontPath } = use(
  'App/Utils/ModelsPath'
);

class Group extends Model {
  static columns() {
    return ['letter', 'championship_id'];
  }

  championship() {
    return this.belongsTo(championshipPath);
  }

  athletes() {
    return this.belongsToMany(athletePath).pivotModel(groupAthletePath);
  }

  confronts() {
    return this.hasMany(confrontPath);
  }
}

module.exports = Group;
