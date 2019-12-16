'use strict';

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route');
const { ttevent, championship } = use('App/Utils/ControllersPath');
const roles = require('../../database/data/role').slugs;

/**
 * TTEvent
 */
Route.resource('ttevents', 'TTEventController')
  .apiOnly()
  .validator(new Map([[['ttevents.store'], ['TTEvent/Store']]]))
  .middleware(
    new Map([
      [
        ['store', 'update', 'destroy'],
        ['auth', `is:(${roles.fed} or ${roles.adm} or ${roles.club})`]
      ]
    ])
  );

Route.group(() => {
  // Table
  Route.resource('tables', `${ttevent}/TableController`).apiOnly();
})
  .prefix('ttevents/:tt_events_id/')
  .middleware(
    new Map([
      [
        ['store', 'update', 'destroy'],
        ['auth', `is:(${roles.fed} or ${roles.adm} or ${roles.club})`]
      ]
    ])
  );
/**
 * Championship
 */
Route.resource('championships', 'ChampionshipController')
  .apiOnly()
  .middleware(
    new Map([
      [
        ['store', 'update', 'destroy'],
        ['auth', `is:(${roles.fed} or ${roles.adm} or ${roles.club})`]
      ]
    ])
  );

Route.group(() => {
  // Confront
  Route.resource('confronts', `${ttevent}/ConfrontController`).apiOnly();

  // Athlete Inscription
  Route.resource(
    'athlete-inscriptions',
    `${championship}/AthleteInscriptionController`
  ).apiOnly();

  // Group
  Route.resource('groups', `${championship}/GroupController`).apiOnly();
})
  .prefix('championships/:championships_id/')
  .middleware(
    new Map([
      [
        ['store', 'update', 'destroy'],
        ['auth', `is:(${roles.fed} or ${roles.adm} or ${roles.club})`]
      ]
    ])
  );
