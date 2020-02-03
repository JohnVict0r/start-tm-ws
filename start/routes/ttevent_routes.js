'use strict';

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route');
const roles = require('../../database/data/role').slugs;

/**
 * TTEvent
 */
Route.resource('ttevents', 'TTEventController').apiOnly();
//  .validator(new Map([[['ttevents.store'], ['TTEvent/Store']]]))
// .middleware(
//   new Map([
//     [
//       ['store', 'update', 'destroy'],
//       ['auth', `is:(${roles.fed} or ${roles.adm} or ${roles.club})`]
//     ]
//   ])
// );

Route.group(() => {
  // Table
  Route.resource('tables', 'TTEvent/TableController').apiOnly();
}).prefix('ttevents/:tt_events_id/');
// .middleware(
//   new Map([
//     [
//       ['store', 'update', 'destroy'],
//       ['auth', `is:(${roles.fed} or ${roles.adm} or ${roles.club})`]
//     ]
//   ])
// );
/**
 * Championship
 */
Route.resource('championships', 'ChampionshipController').apiOnly();
// .middleware(
//   new Map([
//     [
//       ['store', 'update', 'destroy'],
//       ['auth', `is:(${roles.fed} or ${roles.adm} or ${roles.club})`]
//     ]
//   ])
// );

Route.group(() => {
  // Confront
  Route.resource('confronts', 'Championship/ConfrontController').apiOnly();

  // Athlete Inscription
  Route.resource(
    'athlete-inscriptions',
    'Championship/AthleteInscriptionController'
  ).apiOnly();

  // Group
  Route.resource('groups', 'Championship/GroupController').apiOnly();
}).prefix('championships/:championships_id/');
// .middleware(
//   new Map([
//     [
//       ['store', 'update', 'destroy'],
//       ['auth', `is:(${roles.fed} or ${roles.adm} or ${roles.club})`]
//     ]
//   ])
// );

// Group Athlete
Route.resource('group_athletes', 'Championship/GroupAthleteController').only([
  'update'
]);
