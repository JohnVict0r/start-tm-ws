'use strict';

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model');

const { base, championship } = use('App/Utils/ModelsPath');
const AthleteFilter = use('App/ModelFilters/AthleteFilter');

class Athlete extends Model {
  static boot() {
    super.boot();
    this.addTrait('@provider:Filterable', AthleteFilter);
  }

  static columns() {
    return ['rating', 'club_id', 'person_id'];
  }

  championshipInscriptions() {
    return this.hasMany(`${championship}/AthleteInscription`);
  }

  person() {
    return this.belongsTo(`${base}/Person`);
  }

  club() {
    return this.belongsTo(`${base}/Club`);
  }
}

module.exports = Athlete;
