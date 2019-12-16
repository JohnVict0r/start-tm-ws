'use strict';

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route');
const { auth } = use('App/Utils/ControllersPath');
const roles = require('../database/data/role').slugs;

Route.get('/', async () => 'Hello World');

/**
 * Import More Routes
 */
require('./routes/auth_rotes');
require('./routes/ttevent_routes');

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

Route.resource('states', 'StateController').only(['index', 'show']);
