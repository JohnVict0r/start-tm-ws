class SessionController {
  async store({ request, auth }) {
    const { email, password } = request.all();

    const token = await auth.withRefreshToken().attempt(email, password);
    const user = await auth.getUser();

    return { user, token };
  }
}

module.exports = SessionController;
