'use strict';

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route');
const roles = require('../../database/data/role').slugs;

// Permissions
Route.resource('permissions', 'Auth/PermissionController').apiOnly();
// .middleware(
//   new Map([
//     [['index', 'store', 'update', 'destroy'], ['auth', `is:${roles.adm}`]]
//   ])
// );

// Roles
Route.resource('roles', 'Auth/RoleController').apiOnly();
// .middleware(
//   new Map([
//     [
//       ['index', 'store', 'update', 'destroy'],
//       ['auth', `is:${roles.adm}`]
//     ]
//   ])
// );

// Sessions
Route.resource('sessions', 'Auth/SessionController').apiOnly();
// .middleware(
//   new Map([
//     [
//       ['index', 'update', 'destroy'],
//       ['auth', `is:${roles.adm}`]
//     ],
//     [['show'], ['auth']]
//   ])
// );
