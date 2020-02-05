'use strict';

const {
  subscriptionPath,
  userPath,
  personPath,
  addressPath,
  clubPath,
  federationPath,
  athletePath,
  tteventPath,
  entryPath,
  tablePath,
  championshipPath,
  confrontPath,
  athleteInscriptionPath,
  groupPath,
  groupAthletePath
} = use('App/Utils/ModelsPath');

const Subscription = use(subscriptionPath);
const User = use(userPath);
const Person = use(personPath);
const Address = use(addressPath);
const Club = use(clubPath);
const Federation = use(federationPath);
const Athlete = use(athletePath);

/**
 * Event
 */

const TTEvent = use(tteventPath);
const Entry = use(entryPath);
const Table = use(tablePath);

/**
 * Championship
 */
const Championship = use(championshipPath);
const Confront = use(confrontPath);
const AthleteInscription = use(athleteInscriptionPath);
const Group = use(groupPath);
const GroupAthlete = use(groupAthletePath);

module.exports = {
  User,
  Person,
  Address,
  Subscription,
  Club,
  Federation,
  Athlete,

  TTEvent,

  Entry,
  Table,

  Championship,
  AthleteInscription,
  Confront,
  Group,
  GroupAthlete
};
