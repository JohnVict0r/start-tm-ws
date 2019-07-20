'use strict';

const ModelFilter = use('ModelFilter');

class TTEventFilter extends ModelFilter {
  name(name) {
    return this.where('name', 'like', `%${name}%`);
  }

  type(type) {
    return this.where({ type });
  }

  start(start) {
    return this.where('start', 'like', `%${start}%`);
  }

  end(end) {
    return this.where('end', 'like', `%${end}%`);
  }

  owner(owner_id) {
    return this.where({ owner_id });
  }

  address(address_id) {
    return this.where({ address_id });
  }
}

module.exports = TTEventFilter;
