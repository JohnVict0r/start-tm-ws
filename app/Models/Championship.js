/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model');
const { championship } = use('App/Utils/ModelsPath');
const ChampionshipFilter = use('App/ModelFilters/ChampionshipFilter');

class Championship extends Model {
  static boot() {
    super.boot();
    this.addTrait('@provider:Filterable', ChampionshipFilter);
  }

  static columns() {
    return ['sex', 'type', 'upperLimit', 'downLimit', 'tt_event_id'];
  }

  athleteInscriptions() {
    return this.hasMany(`${championship}/AthleteInscription`);
  }

  confronts() {
    return this.hasMany(`${championship}/Confront`);
  }

  groups() {
    return this.hasMany(`${championship}/Group`);
  }
}

module.exports = Championship;
