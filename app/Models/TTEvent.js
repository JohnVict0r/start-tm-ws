'use strict';

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model');

const { base, ttevent, championship } = use('App/Utils/ModelsPath');
const TTEventFilter = use('App/ModelFilters/TTEventFilter');

class TTEvent extends Model {
  static get computed() {
    return ['active'];
  }

  static get table() {
    return 'ttevents';
  }

  static columns() {
    return [
      'name',
      'type',
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

  federation() {
    return this.belongsTo(`${base}/Federation`);
  }

  address() {
    return this.belongsTo(`${base}/Address`);
  }

  entries() {
    return this.hasMany(`${ttevent}/Entry`);
  }

  tables() {
    return this.hasMany(`${ttevent}/Table`);
  }

  championships() {
    return this.hasMany(`${championship}`);
  }
}

module.exports = TTEvent;
