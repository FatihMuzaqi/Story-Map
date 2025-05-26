import AuthModel from "../models/auth.models";

export default class LoginPresenter {
  constructor(view) {
    this.view = view;
  }

  async handleLogin(email, password) {
    try {
      const result = await AuthModel.login(email, password);
      this.view.onLoginSuccess(result.loginResult);
    } catch (error) {
      this.view.onLoginError(error.message);
    }
  }
}
