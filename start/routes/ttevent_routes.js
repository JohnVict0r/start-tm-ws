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

  // Entry
  Route.resource('entries', 'TTEvent/EntryController').apiOnly();

  // Athlete Inscription
  Route.resource(
    'athlete-inscriptions',
    'TTEvent/AthleteInscriptionController'
  ).apiOnly();
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
  // Group
  Route.resource('groups', 'Championship/GroupController').apiOnly();

  // Confront
  Route.resource('confronts', 'Championship/ConfrontController').apiOnly();

  // Set
  Route.resource(
    'confronts/:confronts_id/sets',
    'Championship/SetController'
  ).apiOnly();

  Route.get(
    'classificatory_results/:groups_id',
    'Championship/ClassificatoryResultController.show'
  );
  Route.put(
    'classificatory_results/:groups_id',
    'Championship/ClassificatoryResultController.update'
  );
}).prefix('championships/:championships_id/');
// .middleware(
//   new Map([
//     [
//       ['store', 'update', 'destroy'],
//       ['auth', `is:(${roles.fed} or ${roles.adm} or ${roles.club})`]
//     ]
//   ])
// );

// Confront
Route.put(
  'start_confronts/:confront_id',
  'Championship/StartConfrontController.update'
);
Route.put(
  'end_confronts/:confront_id',
  'Championship/EndConfrontController.update'
);
