import HomePresenter from "../../presenters/home-presenter";
import { getStories, deleteStory } from "../idb";

export default class HomePage {
  constructor() {
    this.markers = [];
  }

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
    this.map = L.map("map").setView([-6.2, 106.816666], 5);
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: "© OpenStreetMap contributors",
    }).addTo(this.map);

    const container = document.querySelector("#story-list");

    try {
      await HomePresenter.loadStories({
        onSuccess: (stories) => {
          this.renderStories(stories, container, this.map);
        },
        onError: async (msg) => {
          const localStories = await getStories();
          if (localStories.length > 0) {
            this.renderStories(localStories, container, this.map);
          } else {
            container.innerHTML = `<p class="error">Gagal memuat cerita dan tidak ada data offline: ${msg}</p>`;
          }
        },
      });
    } catch (err) {
      container.innerHTML = `<p class="error">Terjadi kesalahan: ${err.message}</p>`;
    }

    // 🔴 Event listener tombol hapus
    document.querySelector("#story-list").addEventListener("click", async (event) => {
      if (event.target.closest(".btn-delete")) {
        const id = event.target.closest(".btn-delete").dataset.id;
        if (confirm("Yakin ingin menghapus cerita ini?")) {
          // 1. Hapus dari IndexedDB
          await deleteStory(id);

          // 2. Hapus dari server (jika online)
          if (navigator.onLine) {
            try {
              await fetch(`https://story-api.dicoding.dev/v1/stories/${id}`, {
                method: "DELETE",
                headers: {
                  "Content-Type": "application/json",
                  // Authorization: "Bearer your_token_here" // opsional
                },
              });
            } catch (err) {
              console.warn("Gagal menghapus dari server:", err.message);
            }
          }

          // 3. Hapus marker dari peta
          const markerObj = this.markers.find((m) => m.id === id);
          if (markerObj) {
            this.map.removeLayer(markerObj.marker);
          }

          // 4. Hapus elemen dari DOM
          const storyElement = event.target.closest(".story-item");
          if (storyElement) {
            storyElement.remove();
          }
        }
      }
    });
  }

  renderStories(stories, container, map) {
    this.markers = []; // reset marker lama

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

          <div class="flex justify-end gap-2 mt-3">
            <button class="btn-delete text-red-600 hover:underline" data-id="${story.id}" title="Hapus cerita">
              <i class="fas fa-trash"></i> Hapus
            </button>
          </div>
        </article>
      `
      )
      .join("");

    // Tambahkan marker ke peta
    stories.forEach((story) => {
      if (story.lat && story.lon) {
        const marker = L.marker([story.lat, story.lon])
          .addTo(map)
          .bindPopup(`<strong>${story.name}</strong><br>${story.description}`);
        this.markers.push({ id: story.id, marker });
      }
    });
  }
}
