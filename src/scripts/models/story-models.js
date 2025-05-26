import { postStory } from "../data/api";

const StoryModel = {
  async uploadStory(formData) {
    return await postStory(formData);
  },
};

export default StoryModel;
