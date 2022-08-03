import axios from 'axios';
import { getStory, getStoryIds } from '../service';
import { newStoriesUrl, storyUrl } from '../../constant';
import { singleStory, storyId, undefinedStory } from '../../__mocks__';

jest.mock('axios');

afterEach(() => {
  jest.resetAllMocks();
});

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

  it('Should throws an error when incorrect url is passed', async () => {
    const logSpy = jest.spyOn(console, 'error');
    const err = new Error({ message: 'Network Error' });
    axios.get.mockImplementation(() => Promise.reject(err));
    await getStoryIds();
    expect(logSpy).toHaveBeenCalledTimes(1);
    expect(logSpy).toHaveBeenCalledWith(err.message);
  });

  it('Should throws an error when incorrect no is passed', async () => {
    const err = new Error({ message: 'Network Error' });
    const getStoryErrorSpy = jest.spyOn(console, 'log');
    axios.get.mockRejectedValueOnce(err);
    await getStory(232);

    expect(axios.get).toHaveBeenCalledWith(`${storyUrl + 232}.json`);
    expect(getStoryErrorSpy).toHaveBeenCalledTimes(1);
    expect(getStoryErrorSpy).toHaveBeenCalledWith(err);
  });
});
