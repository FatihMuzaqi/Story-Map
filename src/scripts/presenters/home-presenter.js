import { getData } from "../data/api";

const HomePresenter = {
  async loadStories({ onSuccess, onError }) {
    try {
      const stories = await getData();
      onSuccess(stories);
    } catch (error) {
      onError(error.message);
    }
  },
};

export default HomePresenter;