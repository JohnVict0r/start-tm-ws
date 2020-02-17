'use strict';

const basePath = 'App/Models';
const tteventPath = `${basePath}/TTEvent`;
const championshipPath = `${basePath}/Championship`;
const addressPath = `${basePath}/Address`;
const athletePath = `${basePath}/Athlete`;
const clubPath = `${basePath}/Club`;
const federationPath = `${basePath}/Federation`;
const personPath = `${basePath}/Person`;
const tokenPath = `${basePath}/Token`;
const userPath = `${basePath}/User`;
const subscriptionPath = `${basePath}/Auth/Subscription`;

const entryPath = `${tteventPath}/Entry`;
const tablePath = `${tteventPath}/Table`;
const athleteInscriptionPath = `${tteventPath}/AthleteInscription`;

const confrontPath = `${championshipPath}/Confront`;
const groupPath = `${championshipPath}/Group`;
const setPath = `${championshipPath}/Set`;
const groupAthletePath = `${championshipPath}/GroupAthlete`;

module.exports = {
  basePath,
  tteventPath,
  championshipPath,
  addressPath,
  athletePath,
  clubPath,
  federationPath,
  personPath,
  tokenPath,
  userPath,
  entryPath,
  tablePath,
  athleteInscriptionPath,
  confrontPath,
  groupPath,
  setPath,
  subscriptionPath,
  groupAthletePath
};
