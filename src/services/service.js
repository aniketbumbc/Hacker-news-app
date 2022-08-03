import axios from 'axios';
import { newStoriesUrl, storyUrl } from '../constant';

export const getStoryIds = async () => {
  const result = await axios
    .get(newStoriesUrl)
    .then((data) => data)
    .catch((error) => {
      console.error(`${error.message}`);
    });
  return result;
};

export const getStory = async (id) => {
  const result = await axios
    .get(`${storyUrl + id}.json`)
    .then(({ data }) => data)
    .catch((error) => console.log(error));
  return result;
};
