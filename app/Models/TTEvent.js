'use strict';

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model');

const {
  federationPath,
  addressPath,
  entryPath,
  tablePath,
  championshipPath
} = use('App/Utils/ModelsPath');
const TTEventFilter = use('App/ModelFilters/TTEventFilter');

class TTEvent extends Model {
  static get computed() {
    return ['active', 'acceptingInscriptions'];
  }

  static get table() {
    return 'ttevents';
  }

  static columns() {
    return [
      'name',
      'type',
      'startInscription',
      'endInscription',
      'start',
      'end',
      'federation_id',
      'address',
      'entries',
      'championships',
      'tables'
    ];
  }

  static boot() {
    super.boot();
    this.addTrait('@provider:Filterable', TTEventFilter);
  }

  getActive({ end, start }) {
    const startDate = new Date(start);
    const endDate = new Date(end);
    const now = new Date();

    return startDate <= now && now <= endDate;
  }

  getAcceptingInscriptions({ startInscription, endInscription }) {
    const startDate = new Date(startInscription);
    const endDate = new Date(endInscription);
    const now = new Date();

    return startDate <= now && now <= endDate;
  }

  federation() {
    return this.belongsTo(federationPath);
  }

  address() {
    return this.belongsTo(addressPath);
  }

  entries() {
    return this.hasMany(entryPath);
  }

  tables() {
    return this.hasMany(tablePath);
  }

  championships() {
    return this.hasMany(championshipPath);
  }
}

module.exports = TTEvent;
