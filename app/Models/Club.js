/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model');

const { base } = use('App/Utils/ModelsPath');

const ClubFilter = use('App/ModelFilters/ClubFilter');

class Club extends Model {
  static boot() {
    super.boot();
    this.addTrait('@provider:Filterable', ClubFilter);
  }

  static columns() {
    return ['name', 'federation_id'];
  }

  federation() {
    return this.belongsTo(`${base}/Federation`);
  }

  address() {
    return this.belongsTo(`${base}/Address`);
  }
}

module.exports = Club;
