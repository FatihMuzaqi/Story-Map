import { getStories, deleteStory } from "../idb";

async function displayOfflineStories() {
  const container = document.getElementById("offlineStoryContainer");
  container.innerHTML = "";

  const stories = await getStories();

  if (stories.length === 0) {
    container.innerHTML = "<p>Tidak ada cerita offline.</p>";
    return;
  }

  stories.forEach((story) => {
    const card = document.createElement("div");
    card.className = "story-card";
    card.innerHTML = `
      <p><strong>${story.description}</strong></p>
      <p>Latitude: ${story.lat}</p>
      <p>Longitude: ${story.lon}</p>
      <p>Tanggal: ${new Date(story.createdAt).toLocaleString()}</p>
      <button data-id="${story.id}" class="delete-btn">Hapus</button>
      <hr/>
    `;
    container.appendChild(card);
  });

  //buton hapus
  document.querySelectorAll(".delete-btn").forEach((btn) => {
    btn.addEventListener("click", async () => {
      const id = btn.getAttribute("data-id");
      await deleteStory(id);
      await displayOfflineStories();
    });
  });
}

const OfflinePage = {
  async render() {
    return `
      <section id="offlineStories">
        <h2>Daftar Cerita Offline</h2>
        <div id="offlineStoryContainer"></div>
      </section>
    `;
  },

  async afterRender() {
    await displayOfflineStories();
  },
};

export default OfflinePage;
