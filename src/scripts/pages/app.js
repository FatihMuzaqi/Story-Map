import routes from "../routes/routes";
import { getActiveRoute } from "../routes/url-parser";

class App {
  #content = null;
  #drawerButton = null;
  #navigationDrawer = null;
  #currentPage = null;

  constructor({ navigationDrawer, drawerButton, content }) {
    this.#content = content;
    this.#drawerButton = drawerButton;
    this.#navigationDrawer = navigationDrawer;

    this._setupDrawer();
  }

  _setupDrawer() {
    this.#drawerButton.addEventListener("click", () => {
      this.#navigationDrawer.classList.toggle("open");
    });

    document.body.addEventListener("click", (event) => {
      if (
        !this.#navigationDrawer.contains(event.target) &&
        !this.#drawerButton.contains(event.target)
      ) {
        this.#navigationDrawer.classList.remove("open");
      }

      this.#navigationDrawer.querySelectorAll("a").forEach((link) => {
        if (link.contains(event.target)) {
          this.#navigationDrawer.classList.remove("open");
        }
      });
    });
  }

  async renderPage() {
    this.#content.classList.add("page-transition-active");
    this.#content.classList.remove("page-transition");

    const url = getActiveRoute();
    const page = routes[url];

    if (!page) return;
    if (this.#currentPage && typeof this.#currentPage.destroy === "function") {
      this.#currentPage.destroy();
    }
     this.#currentPage = page; 
    if (!document.startViewTransition) {
      this.#content.classList.remove("page-transition-active");
      this.#content.classList.add("page-transition");
      this.#content.innerHTML = await page.render();
      await page.afterRender();

      setTimeout(() => {
        this.#content.classList.remove("page-transition");
        this.#content.classList.add("page-transition-active");
      }, 50);

      return;
    }
    document.startViewTransition(async () => {
      this.#content.innerHTML = await page.render();
      await page.afterRender();
    });
  }
}

export default App;
