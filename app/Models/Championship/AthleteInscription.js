'use strict';

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model');

const { athletePath, championshipPath } = use('App/Utils/ModelsPath');
const AthleteInscriptionFilter = use(
  'App/ModelFilters/AthleteInscriptionFilter'
);

class AthleteInscription extends Model {
  static boot() {
    super.boot();
    this.addTrait('@provider:Filterable', AthleteInscriptionFilter);
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
