'use strict';

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model');

const { addressPath, federationPath } = use('App/Utils/ModelsPath');

const ClubFilter = use('App/ModelFilters/ClubFilter');

class Club extends Model {
  static boot() {
    super.boot();
    this.addTrait('@provider:Filterable', ClubFilter);
  }

  static columns() {
    return ['name', 'address', 'federation_id'];
  }

  federation() {
    return this.belongsTo(federationPath);
  }

  address() {
    return this.belongsTo(addressPath);
  }
}

module.exports = Club;
