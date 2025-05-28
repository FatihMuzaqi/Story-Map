import { openDB } from "idb";

const DB_NAME = "story-db";
const DB_VERSION = 1;
const STORE_NAME = "stories";

// Inisialisasi atau buka IndexedDB
export const initDB = async () => {
  return openDB(DB_NAME, DB_VERSION, {
    upgrade(db) {
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME, { keyPath: "id" });
      }
    },
  });
};

// Simpan satu atau beberapa story ke IndexedDB
export const saveStories = async (stories) => {
  try {
    const db = await initDB();
    const tx = db.transaction(STORE_NAME, "readwrite");
    const store = tx.objectStore(STORE_NAME);

    // Pastikan input array
    const storiesArray = Array.isArray(stories) ? stories : [stories];

    for (const story of storiesArray) {
      if (!story || typeof story !== "object") {
        console.warn("Invalid story object:", story);
        continue;
      }

      if (story.id) {
        console.log("Saving story to IDB:", story);
        await store.put(story);
      } else {
        console.warn("Story skipped (no ID):", story);
      }
    }

    await tx.done;
  } catch (error) {
    console.error("Failed to save story:", error);
  }
};

// Ambil semua story dari IndexedDB
export const getStories = async () => {
  try {
    const db = await initDB();
    return await db.getAll(STORE_NAME);
  } catch (error) {
    console.error("Failed to get stories:", error);
    return [];
  }
};

// Hapus story berdasarkan ID
export const deleteStory = async (id) => {
  try {
    const db = await initDB();
    return await db.delete(STORE_NAME, id);
  } catch (error) {
    console.error("Failed to delete story:", error);
  }
};
