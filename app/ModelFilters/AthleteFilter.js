'use strict';

const ModelFilter = use('ModelFilter');
const Database = use('Database');
class AthleteFilter extends ModelFilter {
  club(club_id) {
    return this.where({ club_id });
  }

  rating(rating) {
    const value = parseInt(rating, 10);
    return this.whereBetween('rating', [value - 100, value + 100]);
  }

  event(tt_event_id) {
    const champSubquery = Database.from('championships')
      .select('id')
      .where({ tt_event_id });
    const athlInsSubquery = Database.from('athlete_inscriptions')
      .select('athlete_id')
      .whereIn('championship_id', champSubquery);

    return this.whereIn('id', athlInsSubquery);
  }

  notInEvent(tt_event_id) {
    const champSubquery = Database.from('championships')
      .select('id')
      .where({ tt_event_id });
    const athlInsSubquery = Database.from('athlete_inscriptions')
      .select('athlete_id')
      .whereIn('championship_id', champSubquery);

    return this.whereNotIn('id', athlInsSubquery);
  }
}

module.exports = AthleteFilter;
