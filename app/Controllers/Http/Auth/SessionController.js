const { User } = use('App/Models');

class SessionController {
  async store({ request, auth }) {
    const { email, password } = request.all();

    const token = await auth.withRefreshToken().attempt(email, password);

    const user = await User.findByOrFail({ email });

    await user.loadMany(['person', 'athlete', 'roles']);

    return { user, token };
  }

  async show({ auth }) {
    const user = await auth.getUser();

    await user.loadMany(['person', 'athlete', 'roles']);

    return user;
  }
}

module.exports = SessionController;
