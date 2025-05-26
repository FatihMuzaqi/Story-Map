import StoryModel from "../models/story-models";
function generateRandomId() {
  return '_' + Math.random().toString(36).substr(2, 9);
}

const UploadPresenter = {
  async handleFormSubmit({ description, photo, lat, lon, onSuccess, onError }) {
    const formData = new FormData();
    formData.append("description", description);
    formData.append("photo", photo);
    formData.append("lat", lat);
    formData.append("lon", lon);

    try {
      // await StoryModel.uploadStory(formData);
      const response = await StoryModel.uploadStory(formData);

      if (response.error) {
        throw new Error(response.message);
      }

      onSuccess({
        id: generateRandomId(),
        description,
        lat,
        lon,
        createdAt: new Date().toISOString(),
      });
    } catch (error) {
      onError(error.message);
    }
  },
};

export default UploadPresenter;
