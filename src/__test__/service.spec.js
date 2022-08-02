import axios from 'axios';
import {
  getStory,
  getStoryIds,
  newStoriesUrl,
  storyUrl,
} from '../services/service';
import { singleStory, storyId, undefinedStory } from '../__mocks__';

jest.mock('axios');

describe('Service', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  test('Should get correct story from HackerNews Api', async () => {
    axios.get.mockImplementation(() => Promise.resolve({ data: singleStory }));

    const story = await getStory(1);
    expect(axios.get).toHaveBeenCalledTimes(1);
    expect(axios.get).toHaveBeenCalledWith(`${storyUrl + 1}.json`);
    expect(story).toEqual(singleStory);
  });

  test('Should get correct story from HackerNews Api if id is not provide', async () => {
    axios.get.mockImplementation(() =>
      Promise.resolve({ data: undefinedStory })
    );

    const resultStory = await getStory('one');
    expect(axios.get).toHaveBeenCalledTimes(1);
    expect(axios.get).toHaveBeenCalledWith(`${storyUrl + 'one'}.json`);
    expect(resultStory).toEqual(undefinedStory);
  });

  test('Should get correct stories Id from HackerNews Api', async () => {
    axios.get.mockImplementation(() => Promise.resolve({ data: storyId }));

    const resultId = await getStoryIds();
    expect(axios.get).toHaveBeenCalledTimes(1);
    expect(axios.get).toHaveBeenCalledWith(newStoriesUrl);
    expect(resultId.data).toEqual(storyId);
  });
});
