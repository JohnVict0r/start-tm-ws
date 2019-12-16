'use strict';

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route');
const { auth } = use('App/Utils/ControllersPath');
const roles = require('../../database/data/role').slugs;

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
    new Map([
      [['index', 'update', 'destroy'], ['auth', `is:${roles.adm}`]],
      [['show'], ['auth']]
    ])
  );
