'use strict';

const { Confront, GroupAthlete } = use('App/Models');
const { groupBy, singleArray } = use('App/Utils/ArrayUtil');

const GetCofrontScoreResultService = use(
  'App/Services/GetCofrontScoreResultService'
);

class GetClassificatoryPhaseResultService {
  async run({ group_id }) {
    const confrontsQuery = await Confront.query()
      .with('sets')
      .with('athleteOne')
      .with('athleteTwo')
      .where({ group_id })
      .fetch();

    const athletesId = await GroupAthlete.query()
      .select('athlete_id')
      .where({ group_id })
      .pluck('athlete_id');

    const confronts = confrontsQuery
      .toJSON()
      .map((confront) => GetCofrontScoreResultService.run({ confront }));

    // In first calculate the score of all athletes
    const athletesScore = athletesId.map((athlId) => {
      let winSets = 0;
      let loseSets = 0;
      let wins = 0;
      let loses = 0;
      let winSetsScore = 0;
      let loseSetsScore = 0;
      confronts.map((conf) => {
        const confIds = [conf.athlete_one_id, conf.athlete_two_id];
        if (!confIds.includes(athlId)) {
          return conf;
        }

        if (athlId === conf.winnerAthlete.id) wins += 1;
        else loses += 1;

        const [winScore, loseScore] = conf.sets.reduce(
          (acc, current) => [
            acc[0] + current.athlete_one_score,
            acc[1] + current.athlete_two_score
          ],
          [0, 0]
        );

        if (athlId === confIds[0]) {
          winSets += conf.athleteOneSetBalance;
          loseSets += conf.athleteTwoSetBalance;
          winSetsScore += winScore;
          loseSetsScore += loseScore;
        } else {
          loseSets += conf.athleteOneSetBalance;
          winSets += conf.athleteTwoSetBalance;
          loseSetsScore += winScore;
          winSetsScore += loseScore;
        }

        return conf;
      });

      return {
        athlete_id: athlId,
        wins,
        loses,
        winSets,
        loseSets,
        setScoreByWin: winSets / (winSets + loseSets),
        winSetsScore,
        loseSetsScore,
        setsScore: winSetsScore / (winSetsScore + loseSetsScore)
      };
    });

    // Next step is order the athletes by wins in desc order
    const ordenedScore = athletesScore.sort((a, b) => b.wins - a.wins);

    // After that group the athletes by same win score
    const athlGroupedByWins = groupBy(
      ordenedScore,
      (athlScore) => athlScore.wins
    );

    // Right after is order the groups with the same win by setScoreByWin
    const ordenedGroups = athlGroupedByWins.map((group) => {
      const cbtmOrd = group.sort((a, b) => b.setScoreByWin - a.setScoreByWin);

      // if the same value as setScoreByWin exists, make another groups
      const cbtmGroup = groupBy(
        cbtmOrd,
        (athlScore) => athlScore.setScoreByWin
      );

      // Them in last case order by setScore
      const setScoreOrd = cbtmGroup.map((gp) =>
        gp.sort((a, b) => b.setsScore - a.setsScore)
      );

      return singleArray(setScoreOrd);
    });

    // Finally just turn everything into a single array
    const ordenedAthletesByScore = singleArray(ordenedGroups);

    return ordenedAthletesByScore;
  }
}

module.exports = new GetClassificatoryPhaseResultService();
