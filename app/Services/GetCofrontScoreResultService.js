'use strict';

class GetCofrontScoreResultService {
  run({ confront }) {
    const { sets } = confront;

    let athleteOneSetBalance = 0;
    let athleteTwoSetBalance = 0;
    let winnerAthlete = {};

    sets.map((set) => {
      if (set.athlete_one_score > set.athlete_two_score)
        athleteOneSetBalance += 1;
      else athleteTwoSetBalance += 1;
      return set;
    });

    winnerAthlete =
      athleteOneSetBalance > athleteTwoSetBalance
        ? confront.athleteOne
        : confront.athleteTwo;

    confront.athleteOneSetBalance = athleteOneSetBalance;
    confront.athleteTwoSetBalance = athleteTwoSetBalance;
    confront.winnerAthlete = winnerAthlete;

    return confront;
  }
}

module.exports = new GetCofrontScoreResultService();
