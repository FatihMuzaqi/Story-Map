import UploadPresenter from "../../presenters/upload-presenter";
import { saveStories } from "../idb";

export default class UploadPage {
  constructor() {
    this.stream = null;
  }

  async render() {
    return `
   <section class="upload-page">
        <h1>Fitur Tambah Data Baru</h1>
        <form id="uploadForm">
            <div class="form-group">
                <label for="description">Deskripsi:</label>
                <textarea id="description" placeholder="Tulis deskripsi cerita Anda..." required></textarea>
            </div>

            <div class="form-group">
                <label for="photo">Foto:</label>
                <input type="file" id="photo" accept="image/*" required />
            </div>

            <div class="button-group">
                <button aria-label="ambil foto" type="button" id="takePhotoBtn">📷 Ambil Foto dari Kamera</button>
                <button aria-label="ambil gambar" type="button" id="captureBtn" style="display:none;">📸 Ambil Gambar</button>
            </div>

            <canvas id="canvas" style="display:none;"></canvas>
            <img id="photoPreview" src="" alt="Preview foto" />
            <video id="video" style="display:none;" autoplay muted></video>

            <div class="location-inputs">
                <div class="form-group">
                    <label for="lat">Latitude:</label>
                    <input type="text" id="lat" placeholder="Otomatis terdeteksi" readonly />
                </div>
                <div class="form-group">
                    <label for="lon">Longitude:</label>
                    <input type="text" id="lon" placeholder="Otomatis terdeteksi" readonly />
                </div>
            </div>

            <div id="map">🗺️ Peta akan muncul di sini</div>

            <button aria-label="upload cerita" type="submit" id="submitBtn">🚀 Upload Cerita</button>
            <p id="uploadMessage"></p>
        </form>
    </section>
`;
  }

  async afterRender() {
    const map = L.map("map").setView([-6.2, 106.8], 5);
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: "© OpenStreetMap contributors",
    }).addTo(map);

    let marker;

    map.on("click", (e) => {
      const lat = e.latlng.lat;
      const lon = e.latlng.lng;

      document.getElementById("lat").value = lat;
      document.getElementById("lon").value = lon;

      if (marker) map.removeLayer(marker);
      marker = L.marker([lat, lon])
        .addTo(map)
        .bindPopup("Lokasi Cerita Anda")
        .openPopup();
    });

    const form = document.getElementById("uploadForm");
    const message = document.getElementById("uploadMessage");
    const submitBtn = document.getElementById("submitBtn");

    form.addEventListener("submit", async (e) => {
      e.preventDefault();

      const description = document.getElementById("description").value;
      const photo = document.getElementById("photo").files[0];
      const lat = document.getElementById("lat").value;
      const lon = document.getElementById("lon").value;

      if (!lat || !lon) {
        message.textContent = "Silakan pilih lokasi di peta.";
        return;
      }
      if (!description.trim()) {
        message.textContent = "Deskripsi tidak boleh kosong.";
        return;
      }

      if (!photo) {
        message.textContent = "Silakan pilih foto untuk diunggah.";
        return;
      }

      submitBtn.disabled = true;
      submitBtn.textContent = "Upload...";
      message.textContent = "";

      await UploadPresenter.handleFormSubmit({
        description,
        photo,
        lat,
        lon,
        onSuccess: async (responseData) => {
          console.log("RESPONSE DATA:", responseData);
          message.textContent = "Cerita berhasil diupload!";
          message.className = "success";

          // simpan ke indexdb
          await saveStories([responseData]);
          console.log("responseData from server:", responseData);

          window.location.hash = "#/home";
        },
        onError: (msg) => {
          message.textContent = `Gagal upload cerita: ${msg}`;
          message.className = "error";
        },
      });

      submitBtn.disabled = false;
      submitBtn.textContent = "Upload Cerita";
    });

    const video = document.getElementById("video");
    const canvas = document.getElementById("canvas");
    const context = canvas.getContext("2d");
    const captureBtn = document.getElementById("captureBtn");
    const photoPreview = document.getElementById("photoPreview");

    document
      .getElementById("takePhotoBtn")
      .addEventListener("click", async () => {
        if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
          alert("perangkat tidak mendukung kamera.");
          return;
        }

        try {
          this.stream = await navigator.mediaDevices.getUserMedia({
            video: true,
          });
          video.srcObject = this.stream;
          video.style.display = "block";
          canvas.style.display = "none";
          photoPreview.src = "";
          captureBtn.style.display = "inline-block";
        } catch (err) {
          console.error("Gagal mengakses kamera:", err);
          alert("Gagal mengakses kamera.");
        }
      });

    captureBtn.addEventListener("click", () => {
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      context.drawImage(video, 0, 0, canvas.width, canvas.height);
      const dataUrl = canvas.toDataURL("image/png");

      const files = createFileListFromBase64(dataUrl);

      photoPreview.src = dataUrl;
      photoPreview.style.display = "block";

      if (this.stream) {
        this.stream.getTracks().forEach((track) => track.stop());
        this.stream = null;
      }

      video.style.display = "none";
      captureBtn.style.display = "none";

      const photoInput = document.getElementById("photo");
      photoInput.files = files;
    });

    function createFileListFromBase64(base64Image) {
      const byteCharacters = atob(base64Image.split(",")[1]);
      const byteArrays = [];

      for (let offset = 0; offset < byteCharacters.length; offset++) {
        byteArrays.push(byteCharacters.charCodeAt(offset));
      }

      const file = new Blob([new Uint8Array(byteArrays)], {
        type: "image/png",
      });
      const fileList = new DataTransfer();
      fileList.items.add(new File([file], "photo.png", { type: "image/png" }));

      return fileList.files;
    }
  }

  destroy() {
    if (this.stream) {
      this.stream.getTracks().forEach((track) => track.stop());
      this.stream = null;
    }
  }
}
