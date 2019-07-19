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
    return ['rating', 'club_id', 'user_id'];
  }

  championshipInscriptions() {
    return this.hasMany(`${championship}/AthleteInscription`);
  }

  user() {
    return this.belongsTo(`${base}/User`);
  }

  club() {
    return this.belongsTo(`${base}/Club`);
  }
}

module.exports = Athlete;
