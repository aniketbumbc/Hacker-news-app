import React from 'react';
import App from './App';
import { render, cleanup, waitFor } from '@testing-library/react';
import { singleStory, storyId } from './__mocks__';
import { getStory, getStoryIds } from './services/service';
import { useInfiniteScroller } from './hooks/useInfiniteScroller';
import { STORY_INCREMENT } from './constant';

beforeEach(cleanup);
jest.mock('./hooks/useInfiniteScroller.js');
jest.mock('./services/service', () => ({
  getStory: jest.fn(),
  getStoryIds: jest.fn(),
}));

describe('App Component', () => {
  test('should render application correctly', async () => {
    useInfiniteScroller.mockImplementation(() => ({
      count: STORY_INCREMENT,
    }));

    getStoryIds.mockImplementation(() => Promise.resolve(storyId));
    getStory.mockImplementation(() => Promise.resolve(singleStory));

    const { getByText } = render(<App />);

    await waitFor(() => [
      expect(getByText('Hacker News')).toBeTruthy(),
      // expect(getByText('Giant water battery')).toBeTruthy(),
    ]);
  });
});
