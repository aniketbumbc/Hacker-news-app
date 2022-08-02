import React from 'react';
import Story from '../story';
import { render, screen, cleanup, waitFor } from '@testing-library/react';
import { singleStory, storyId } from '../../../__mocks__';
import { getStory } from '../../../services/service';

beforeEach(() => {
  cleanup();
  jest.resetAllMocks();
});

jest.mock('../../../services/service', () => ({
  getStory: jest.fn(),
}));

describe('Story Component', () => {
  test('should render correct story', async () => {
    getStory.mockImplementation(() => Promise.resolve(singleStory));
    const { getByText } = render(<Story storyId='9865' />);

    await waitFor(() => [
      expect(getByText('hubraumhugo')).toBeInTheDocument(),
      expect(
        getByText(
          'Giant water battery under the Alps could be a game-changer for renewable energy'
        )
      ).toBeInTheDocument(),
    ]);
  });
});
