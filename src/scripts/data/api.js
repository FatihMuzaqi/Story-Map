import CONFIG from "../config";

const ENDPOINTS = {
  GET_STORIES: `${CONFIG.BASE_URL}/stories`,
};

export async function getData() {
  const token = localStorage.getItem("token");

  const response = await fetch(ENDPOINTS.GET_STORIES, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    const errorMessage = `Error ${response.status}: ${response.statusText}`;
    throw new Error(`Gagal mengambil data - ${errorMessage}`);
  }

  const result = await response.json();
  return result.listStory || [];
}

export async function postStory(formData) {
  const token = localStorage.getItem("token");

  const response = await fetch(ENDPOINTS.GET_STORIES, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: formData,
  });
  

  if (!response.ok) {
    throw new Error(`Gagal upload story: ${response.statusText}`);
  }

  return response.json();
}
