import HomePresenter from "../../presenters/home-presenter";
import { getStories } from "../idb";

export default class HomePage {
  async render() {
    return `
      <section class="container">
        <h1><i class="fas fa-book-open"></i> Jelajahi Map</h1>
        <div id="map" class="mb-6"></div>
        <div class="flex justify-between items-center mb-4">
          <button aria-label="tambah cerita" onclick="window.location.hash = '#/upload'" class="btn-secondary">
            <i class="fas fa-plus"></i> Tambah Cerita di Map
          </button>
        </div>
        <div id="story-list" class="story-list">
          <div class="loading-container">
            <div class="loading-spinner"></div>
          </div>
        </div>
      </section>
    `;
  }

  async afterRender() {
    const map = L.map("map").setView([-6.2, 106.816666], 5);
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: "© OpenStreetMap contributors",
    }).addTo(map);

    const container = document.querySelector("#story-list");

    try {
      await HomePresenter.loadStories({
        onSuccess: (stories) => {
          this.renderStories(stories, container, map);
        },
        onError: async (msg) => {
          const localStories = await getStories();
          if (localStories.length > 0) {
            this.renderStories(localStories, container, map);
          } else {
            container.innerHTML = `<p class="error">Gagal memuat cerita dan tidak ada data offline: ${msg}</p>`;
          }
        },
      });
    } catch (err) {
      container.innerHTML = `<p class="error">Terjadi kesalahan: ${err.message}</p>`;
    }
  }

  renderStories(stories, container, map) {
    if (stories.length === 0) {
      container.innerHTML = "<p>Tidak ada cerita untuk ditampilkan.</p>";
      return;
    }

    container.innerHTML = stories
      .map(
        (story) => `
        <article class="story-item shadow hover:shadow-lg transition-shadow duration-300">
          <img src="${story.photoUrl}" alt="${story.name}" loading="lazy">
          <h3>${story.name}</h3>
          <p>${story.description}</p>
          <small>${new Date(story.createdAt).toLocaleString()}</small>
        </article>
      `
      )
      .join("");

    stories.forEach((story) => {
      if (story.lat && story.lon) {
        L.marker([story.lat, story.lon])
          .addTo(map)
          .bindPopup(`<strong>${story.name}</strong><br>${story.description}`);
      }
    });
  }
}
