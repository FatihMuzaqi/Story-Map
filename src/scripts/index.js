import "../styles/styles.css";
import { registerServiceWorker } from "../public/push";
import { subscribeUserToPush } from "../public/push";

import App from "./pages/app";

document.addEventListener("DOMContentLoaded", () => {
  const mainContent = document.querySelector("#main-content");
  mainContent.classList.add("page-transition-active");
  mainContent.classList.remove("page-transition");

  const app = new App({
    navigationDrawer: document.querySelector("#navigation-drawer"),
    drawerButton: document.querySelector("#drawer-button"),
    content: document.querySelector("#main-content"),
  });

  window.addEventListener("hashchange", () => app.renderPage());
  window.addEventListener("load", () => app.renderPage());
  const skipLink = document.querySelector(".skip-link");
  skipLink.addEventListener("click", function (event) {
    event.preventDefault();
    skipLink.blur();

    mainContent.focus();
    mainContent.scrollIntoView();
  });
});

document.addEventListener("DOMContentLoaded", () => {
  registerServiceWorker();
});
document.addEventListener("DOMContentLoaded", () => {
  const subscribeButton = document.getElementById("subscribe-button");
  subscribeButton.addEventListener("click", async () => {
    if ("serviceWorker" in navigator) {
      const registration = await navigator.serviceWorker.ready;
      await subscribeUserToPush(registration);
      console.log("Berhasil mendaftarkan service worker.");
    } else {
      console.warn("Service worker not supported in this browser.");
    }
  });
});
