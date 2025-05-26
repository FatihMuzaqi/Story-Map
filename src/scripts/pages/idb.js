import { openDB } from "idb";

const DB_NAME = "story-db";
const STORE_NAME = "stories";

export const initDB = async () => {
  return openDB(DB_NAME, 1, {
    upgrade(db) {
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME, { keyPath: "id" });
      }
    },
  });
};
export const saveStories = async (stories) => {
  const db = await initDB();
  const tx = db.transaction("stories", "readwrite");
  const store = tx.objectStore("stories");

  stories.forEach((story) => {
    if (!story || typeof story !== "object") {
      console.warn("Invalid story object:", story);
      return;
    }

    if (story.id) {
      console.log("Story being saved to IDB:", story);
      store.put(story);
    } else {
      console.warn("Story skipped because it has no ID:", story);
    }
  });

  await tx.done;
};

export const getStories = async () => {
  const db = await initDB();
  return db.getAll(STORE_NAME);
};

export const deleteStory = async (id) => {
  const db = await initDB();
  return db.delete(STORE_NAME, id);
};
