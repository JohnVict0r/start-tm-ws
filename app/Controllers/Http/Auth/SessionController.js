class SessionController {
  async store({ request, auth }) {
    const { email, password } = request.all();

    return auth.withRefreshToken().attempt(email, password);
  }

  async show({ auth }) {
    const user = await auth.getUser();

    await user.loadMany(['person', 'roles']);

    return user;
  }
}

module.exports = SessionController;
