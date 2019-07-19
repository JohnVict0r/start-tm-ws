'use strict';

const ModelFilter = use('ModelFilter');

class ClubFilter extends ModelFilter {
  name(name) {
    return this.where('name', 'like', `%${name}%`);
  }

  federation(federation_id) {
    return this.where({ federation_id });
  }
}

module.exports = ClubFilter;
