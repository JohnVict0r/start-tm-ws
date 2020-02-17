'use strict';

const {
  Athlete, Entry, Championship
} = use('App/Models');
const { getAge } = use('App/Utils/DateUtil');

class CreateAthleteInscriptionService {
  async run({ athlete_id, entry_id, tt_event_id }) {
    const athlete = await Athlete.findOrFail(athlete_id);
    await athlete.load('person');
    athlete.age = getAge(athlete.getRelated('person').birth);
    athlete.sex = athlete.getRelated('person').sex;

    const entry = await Entry.findOrFail(entry_id);
    const champsQuery = await Championship.query()
      .where({ tt_event_id })
      .fetch();
    const championships = champsQuery.toJSON();
    const selectedChamps = [];

    let k = 0;
    entry.type.split('').map((type) => {
      if (type === 'K') {
        k += 1;
        selectedChamps.push(this.getRankingChampionship({
          athlete,
          championships,
          secondRank: k === 2
        }));
      } else if (type === 'R') {
        selectedChamps.push(
          this.getRatingChampionship({ athlete, championships })
        );
      }

      return type;
    });

    const inscriptions = selectedChamps.map(champ => ({
      championship_id: !champ ? null : champ.id,
      athlete_id: athlete.id,
      entry_id: entry.id,
      approved: true
    }));

    return inscriptions;
  }

  getRankingChampionship({ athlete, championships, secondRank }) {
    let availableChamps = [];

    if (secondRank) {
      availableChamps = championships.filter(
        (champ) => champ.type === 'RAK'
        && athlete.sex === champ.sex
        && champ.downLimit > athlete.age
      );

      availableChamps = availableChamps.sort(
        (a, b) => a.downLimit - b.downLimit
      );

      return availableChamps[0];
    }

    availableChamps = championships.filter(
      (champ) => champ.type === 'RAK'
      && athlete.sex === champ.sex
      && champ.upperLimit >= athlete.age
      && champ.downLimit <= athlete.age
    );


    return availableChamps[0];
  }

  getRatingChampionship({ athlete, championships }) {
    const availableChamps = championships.filter(
      (champ) => champ.upperLimit >= athlete.rating
      && champ.type === 'RAT'
      && athlete.sex === champ.sex
      && champ.downLimit <= athlete.rating
    );

    return availableChamps[0];
  }
}

module.exports = new CreateAthleteInscriptionService();
