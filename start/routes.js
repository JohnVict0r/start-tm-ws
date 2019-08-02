'use strict';

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route');
Route.get('/', async () => {});

const { auth, ttevent, championship } = use('App/Utils/ControllersPath');
const roles = require('../database/data/role').slugs;

// Permissions
Route.resource('permissions', `${auth}/PermissionController`)
  .apiOnly()
  .middleware(
    new Map([
      [['index', 'store', 'update', 'destroy'], ['auth', `is:${roles.adm}`]]
    ])
  );

// Roles
Route.resource('roles', `${auth}/RoleController`)
  .apiOnly()
  .middleware(
    new Map([
      [['index', 'store', 'update', 'destroy'], ['auth', `is:${roles.adm}`]]
    ])
  );

// Sessions
Route.resource('sessions', `${auth}/SessionController`)
  .apiOnly()
  .middleware(
    new Map([[['index', 'update', 'destroy'], ['auth', `is:${roles.adm}`]]])
  );

// Subscriptions
Route.post('/subscriptions', `${auth}/SubscriptionController.store`).validator(
  `${auth}/Subscription/Store`
);

// Users
Route.resource('users', 'UserController')
  .apiOnly()
  .middleware(
    new Map([
      [['index', 'show', 'update', 'destroy'], ['auth', `is:${roles.adm}`]],
      [['show'], ['auth', `is:(${roles.adm} or ${roles.gst})`]]
    ])
  );

// Address
Route.resource('addresses', 'AddressController')
  .only(['show', 'update'])
  .middleware(new Map([[['update'], ['auth']]]));

// People
Route.resource('people', 'PersonController')
  .apiOnly()
  .validator(new Map([[['people.store'], ['Person/Store']]]))
  .middleware(
    new Map([[['store', 'update', 'destroy'], ['auth', `is:${roles.adm}`]]])
  );

// Federations
Route.resource('federations', 'FederationController')
  .apiOnly()
  .validator(new Map([[['federations.store'], ['Federation/Store']]]))
  .middleware(
    new Map([[['store', 'update', 'destroy'], ['auth', `is:${roles.adm}`]]])
  );

// Clubs
Route.resource('clubs', 'ClubController')
  .apiOnly()
  .validator(new Map([[['clubs.store'], ['Club/Store']]]))
  .middleware(
    new Map([
      [
        ['store', 'update', 'destroy'],
        ['auth', `is:(${roles.adm} or ${roles.fed})`]
      ]
    ])
  );

// Athletes
Route.resource('athletes', 'AthleteController')
  .apiOnly()
  .validator(new Map([[['athletes.store'], ['Athlete/Store']]]))
  .middleware(
    new Map([
      [
        ['store', 'update', 'destroy'],
        ['auth', `is:(${roles.adm} or ${roles.fed} or ${roles.club})`]
      ]
    ])
  );

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
