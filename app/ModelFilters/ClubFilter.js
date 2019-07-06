'use strict';

const ModelFilter = use('ModelFilter');

class ClubFilter extends ModelFilter {
  federation(id) {
    return this.where('federation_id', id);
  }
}

module.exports = ClubFilter;
