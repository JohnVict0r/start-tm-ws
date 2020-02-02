'use strict';

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model');

const { personPath, athleteInscriptionPath, clubPath } = use(
  'App/Utils/ModelsPath'
);

const AthleteFilter = use('App/ModelFilters/AthleteFilter');

class Athlete extends Model {
  static boot() {
    super.boot();
    this.addTrait('@provider:Filterable', AthleteFilter);
  }

  static columns() {
    return ['rating', 'club_id', 'person_id'];
  }

  athleteInscriptions() {
    return this.hasMany(athleteInscriptionPath);
  }

  person() {
    return this.belongsTo(personPath);
  }

  club() {
    return this.belongsTo(clubPath);
  }
}

module.exports = Athlete;
