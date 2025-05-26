import RegisterPresenter from "../../presenters/register-presenter";

export default class RegisterPage {
  async render() {
    return `
      <section class="">
        <section>
        <form id="registerForm">
        <label for="name">Nama:</label>
          <input id="name" placeholder="name" required/>
          <label for="email">Email:</label>
          <input id="email" placeholder="email" required/>
          <label for="password">Password:</label>
          <input id="password" type="password" placeholder="password" required/>
          <button aria-label="register" type="submit">Register</button>
        </form>
        <div id="registerMessage"></div>
      </section>
      </section>
    `;
  }

  async afterRender() {
    const form = document.getElementById("registerForm");
    const message = document.getElementById("registerMessage");

    form.addEventListener("submit", async (e) => {
      e.preventDefault();
      const name = document.getElementById("name").value;
      const email = document.getElementById("email").value;
      const password = document.getElementById("password").value;

      const { success, message: responseMsg } =
        await RegisterPresenter.handleRegister({ name, email, password });

      message.textContent = responseMsg;
      if (success) {
        window.location.hash = "#/login";
      }
    });
  }
}
