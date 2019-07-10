/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route');
Route.get('/', () => ({ starttm: 'Bem vindo ao sistema Start TM' }));

const { auth, ttevent, championship } = use('App/Utils/ControllersPath');

// Subscriptions
Route.post('/subscriptions', `${auth}/SubscriptionController.store`).validator(
  `${auth}/Subscription/Store`
);

/**
 * Users
 */
Route.resource('users', 'UserController').apiOnly();

// People
Route.resource('people', 'PersonController')
  .apiOnly()
  .validator(new Map([[['people.store'], ['Person/Store']]]));

/**
 * Auth Sessions
 */
Route.resource('sessions', `${auth}/SessionController`);

/**
 * Auth Permissions
 */
Route.resource('permissions', `${auth}/PermissionController`)
  .apiOnly()
  .middleware('auth');

/**
 * Auth Roles
 */
Route.resource('roles', `${auth}/RoleController`)
  .apiOnly()
  .middleware('auth');

// Federations
Route.resource('federations', 'FederationController')
  .apiOnly()
  .validator(new Map([[['federations.store'], ['Federation/Store']]]));

// Clubs
Route.resource('clubs', 'ClubController')
  .apiOnly()
  .validator(new Map([[['clubs.store'], ['Club/Store']]]));

// Athletes
Route.resource('athletes', 'AthleteController')
  .apiOnly()
  .validator(new Map([[['athletes.store'], ['Athlete/Store']]]));

/**
 * TTEvent
 */
Route.resource('ttevents', 'TTEventController')
  .apiOnly()
  .validator(new Map([[['ttevents.store'], ['TTEvent/Store']]]));

Route.group(() => {
  // Table
  Route.resource('tables', `${ttevent}/TableController`).apiOnly();
})
  .prefix('ttevents/:tt_events_id/')
  .middleware(['auth', 'is:(federation)']);

/**
 * Championship
 */
Route.resource('championships', 'ChampionshipController').apiOnly();

Route.group(() => {
  // Confront
  Route.resource('confronts', `${ttevent}/ConfrontController`).apiOnly();

  // Athlete Inscription
  Route.resource('athlete-inscriptions', `${championship}/AthleteInscriptionController`).apiOnly();

  // Group
  Route.resource('groups', `${championship}/GroupController`).apiOnly();
}).prefix('championships/:championships_id/');
