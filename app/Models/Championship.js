'use strict';

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model');
const { confrontPath, athleteInscriptionPath, groupPath } = use(
  'App/Utils/ModelsPath'
);
const ChampionshipFilter = use('App/ModelFilters/ChampionshipFilter');

class Championship extends Model {
  static boot() {
    super.boot();
    this.addTrait('@provider:Filterable', ChampionshipFilter);
  }

  static columns() {
    return [
      'name',
      'sex',
      'type',
      'upperLimit',
      'downLimit',
      'active',
      'tt_event_id'
    ];
  }

  athleteInscriptions() {
    return this.hasMany(athleteInscriptionPath);
  }

  confronts() {
    return this.hasMany(confrontPath);
  }

  groups() {
    return this.hasMany(groupPath);
  }
}

module.exports = Championship;
