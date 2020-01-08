'use strict';

const ModelFilter = use('ModelFilter');

class AthleteFilter extends ModelFilter {
  club(club_id) {
    return this.where({ club_id });
  }

  rating(rating) {
    const value = parseInt(rating, 10);
    return this.whereBetween('rating', [value - 100, value + 100]);
  }
}

module.exports = AthleteFilter;
