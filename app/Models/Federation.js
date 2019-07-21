'use strict';

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model');
const FederationFilter = use('App/ModelFilters/FederationFilter');

class Federation extends Model {
  static boot() {
    super.boot();
    this.addTrait('@provider:Filterable', FederationFilter);
  }

  static columns() {
    return ['name', 'initials', 'uf'];
  }
}

module.exports = Federation;
