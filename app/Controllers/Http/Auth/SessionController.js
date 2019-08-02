class SessionController {
  async store({ request, auth }) {
    const { email, password } = request.all();

    const token = await auth.withRefreshToken().attempt(email, password);

    return token;
  }

  async show({ auth }) {
    const user = await auth.getUser();

    await user.loadMany(['person', 'roles']);

    return user;
  }
}

module.exports = SessionController;
