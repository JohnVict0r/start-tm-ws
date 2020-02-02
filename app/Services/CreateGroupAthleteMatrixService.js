const { Championship, Athlete } = use('App/Models');

class CreateGroupAthleteMatrixService {
  async run({ championships_id }) {
    const championship = await Championship.findOrFail(championships_id);

    const res = await championship
      .athleteInscriptions()
      .select('athlete_id')
      .where({ approved: true })
      .fetch();
    const athletesForQueryIds = Array.from(res.toJSON(), (i) => i.athlete_id);
    const athletesQuery = await Athlete.query()
      .whereIn('id', athletesForQueryIds)
      .orderBy('rating', 'asc')
      .fetch();
    // Athletes in Asc Order
    const athletesQueryJson = athletesQuery.toJSON();

    // Create athlete ids with rating in Asc Order
    const athletes = [];
    athletesQueryJson.map((athlete) => athletes.push(athlete.id));

    const ATHLETE_PER_GROUP = 3;
    const groupAmount = Math.trunc(athletes.length / ATHLETE_PER_GROUP);
    const groupMatrix = Array.from(Array(groupAmount), () => new Array());
    const extraGroup = [];

    let y = 0;

    // When athletes.length % ATHLETE_PER_GROUP > 1 the distribution needs to separate the strongest athletes
    // To they can be added later
    if (athletes.length % ATHLETE_PER_GROUP > 1) {
      extraGroup.push(athletes.pop());
      extraGroup.push(athletes.pop());
    }

    // First distribution is in desc order, the wrench heads
    for (let i = 0; i < groupAmount; i += 1)
      groupMatrix[i].push(athletes.pop());

    // The others are in ascending order

    // Regardless if there is an athlete left, the last one will always go to the last group
    const lastAthlete = athletes.shift();

    athletes.map((athlete) => {
      groupMatrix[y].push(athlete);

      y += 1;
      if (y >= groupAmount) y = 0;
      return ath;
    });

    groupMatrix[groupAmount - 1].push(lastAthlete);

    if (extraGroup.length !== 0) groupMatrix.unshift(extraGroup);

    return groupMatrix;
  }
}

module.exports = new CreateGroupAthleteMatrixService();
