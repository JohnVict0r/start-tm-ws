'use strict';

const ModelFilter = use('ModelFilter');

class ChampionshipFilter extends ModelFilter {
  name(name) {
    return this.where('name', 'like', `%${name}%`);
  }

  sex(sex) {
    return this.where({ sex });
  }

  type(type) {
    return this.where({ type });
  }

  upperLimit(upperLimit) {
    return this.where({ upperLimit });
  }

  downLimit(downLimit) {
    return this.where({ downLimit });
  }

  tt_event_id(tt_event_id) {
    return this.where({ tt_event_id });
  }
}

module.exports = ChampionshipFilter;
