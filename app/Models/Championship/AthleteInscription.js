'use strict';

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model');

const { athletePath, championshipPath } = use('App/Utils/ModelsPath');

class AthleteInscription extends Model {
  static boot() {
    super.boot();
  }

  static columns() {
    return ['athlete_id', 'championship_id', 'approved'];
  }

  athlete() {
    return this.belongsTo(athletePath);
  }

  championship() {
    return this.belongsTo(championshipPath);
  }
}

module.exports = AthleteInscription;
