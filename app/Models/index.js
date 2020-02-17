'use strict';

const paths = use('App/Utils/ModelsPath');

const Subscription = use(paths.subscriptionPath);
const User = use(paths.userPath);
const Person = use(paths.personPath);
const Address = use(paths.addressPath);
const Club = use(paths.clubPath);
const Federation = use(paths.federationPath);
const Athlete = use(paths.athletePath);
const AthleteInscription = use(paths.athleteInscriptionPath);

/**
 * Event
 */

const TTEvent = use(paths.tteventPath);
const Entry = use(paths.entryPath);
const Table = use(paths.tablePath);

/**
 * Championship
 */
const Championship = use(paths.championshipPath);
const Confront = use(paths.confrontPath);
const Group = use(paths.groupPath);
const GroupAthlete = use(paths.groupAthletePath);
const Set = use(paths.setPath);

module.exports = {
  User,
  Person,
  Address,
  Subscription,
  Club,
  Federation,
  Athlete,
  AthleteInscription,

  TTEvent,

  Entry,
  Table,

  Championship,
  Confront,
  Group,
  GroupAthlete,
  Set
};
