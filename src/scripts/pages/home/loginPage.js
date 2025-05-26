import LoginPresenter from "../../presenters/loginPresenter";

export default class LoginPage {
  constructor() {
    this.presenter = new LoginPresenter(this);
  }

  async render() {
    return `
     <section class="container-login">
        <div class="login-card">
            <div class="login-header">
                <div class="login-icon">
                    <i class="fas fa-map-marked-alt"></i>
                </div>
                <h2>Selamat Datang</h2>
                <p class="login-subtitle">Masuk ke akun Story Map Anda</p>
            </div>

            <form id="loginForm">
                <div class="input-group">
                    <label for="email">Email</label>
                    <input type="email" id="email" placeholder="Masukkan email Anda" required />
                    <i class="fas fa-envelope input-icon"></i>
                </div>

                <div class="input-group">
                    <label for="password">Password</label>
                    <input type="password" id="password" placeholder="Masukkan password Anda" required />
                    <i class="fas fa-eye input-icon password-toggle" id="togglePassword"></i>
                </div>

                <button aria-label="login" type="submit" id="loginBtn">
                    <i class="fas fa-sign-in-alt"></i> Masuk
                </button>
            </form>

            <div class="register-link">
                <p>Belum punya akun? <a href="#/register">Daftar di sini</a></p>
            </div>


            <p id="loginMessage"></p>
        </div>
    </section>
    `;
  }

  async afterRender() {
    const form = document.getElementById("loginForm");

    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const email = document.getElementById("email").value;
      const password = document.getElementById("password").value;

      this.presenter.handleLogin(email, password);
    });
  }
  onLoginSuccess(loginResult) {
    localStorage.setItem("token", loginResult.token);
    document.getElementById("loginMessage").textContent = "Login berhasil!";
    window.location.hash = "#/home";
  }
  onLoginError(message) {
    document.getElementById("loginMessage").textContent = message;
  }
}
